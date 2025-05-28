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

export async function getEntries(queryOptions = {}) {
  const {
    startDate,
    endDate,
    sortBy,
    ascending = true,
    searchTerm,
  } = queryOptions;

  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("User not authenticated:", authError?.message);
    return null;
  }

  const user = userData.user;

  let query = supabase.from("entries").select().eq("user_id", user.id);

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  if (endDate) {
    query = query.lte("created_at", endDate);
  }

  if (sortBy) {
    query = query.order(sortBy, { ascending });
  }

  if (searchTerm) {
    const term = `%${searchTerm}%`;
    query = query.or(`title.ilike.${term},content.ilike.${term}`);
  }

  const { data, error } = await query;

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

export async function editEntry(entry) {
  const { data, error } = await supabase
    .from("entries")
    .update({
      title: entry.title,
      content: entry.content,
    })
    .eq("id", entry.id)
    .select()
    .single();

  if (error) {
    console.error("Error when editing entry:", error);
    return null;
  }

  return data;
}

export async function deleteEntry(entryId) {
  const { data, error } = await supabase
    .from("entries")
    .delete()
    .eq("id", entryId)
    .select();

  if (error) {
    console.error("Error deleting entry:", error);
    return null;
  }

  return data;
}
