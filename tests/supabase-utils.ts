import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const {
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  TEST_EMAIL,
  TEST_PASSWORD,
} = process.env;

if (
  !NEXT_PUBLIC_SUPABASE_URL ||
  !SUPABASE_SERVICE_ROLE_KEY ||
  !TEST_EMAIL ||
  !TEST_PASSWORD
) {
  throw new Error(
    "Please set the NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TEST_EMAIL and TEST_PASSWORD environment variables"
  );
}

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

async function createUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: TEST_EMAIL!,
    password: TEST_PASSWORD!,
    user_metadata: { name: "Test User for E2E tests" },
    email_confirm: true,
  });
  if (error) {
    throw new Error(error.message);
  }
  if (!data.user) {
    throw new Error("User not found");
  }
  return data.user;
}

async function deleteUser(userId: string) {
  await supabase.auth.admin.deleteUser(userId);
}

async function deleteBookmarks(userId: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export { createUser, deleteUser, deleteBookmarks };
