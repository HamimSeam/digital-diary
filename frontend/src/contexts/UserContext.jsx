// src/contexts/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // Fetch user on mount
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoadingUser(false);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingUser(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loadingUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to access user context
export function useUser() {
  return useContext(UserContext);
}
