import { FullConfig } from "@playwright/test";
import { deleteUser } from "./supabase-utils";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const { TEST_USER_ID } = process.env;

async function globalTeardown(config: FullConfig) {
  // We do this check here because the env var is not defined until the global setup runs
  if (!TEST_USER_ID) {
    throw new Error(
      "Missing TEST_USER_ID environment variables from E2E setup"
    );
  }
  // Delete user
  await deleteUser(TEST_USER_ID!);
}

export default globalTeardown;
