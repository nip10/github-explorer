import { FullConfig } from "@playwright/test";
import { createUser } from "./supabase-utils";

async function globalSetup(config: FullConfig) {
  // Create test user
  const testUser = await createUser();
  // Make user id available to tests
  process.env.TEST_USER_ID = testUser.id;
}

export default globalSetup;
