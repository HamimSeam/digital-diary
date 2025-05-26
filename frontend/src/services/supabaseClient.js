import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    return null;
  }

  console.log("Successfully signed up!");
  return data.user;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return null;
  }
  return data.user;
}

export async function createEntry(entry) {
  const { data, error } = await supabase
    .from("entries")
    .insert([entry])
    .select();

  if (error) {
    console.error("Error when creating entry:", error);
    return null;
  }

  return data;
}

export async function getEntries() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("entries")
    .select()
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to fetch entries:", error);
    return null;
  }

  return data;
}

export async function getEntryById(id) {
  const { data, error } = await supabase
    .from("entries")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch entry", error);
  }

  return data;
}
