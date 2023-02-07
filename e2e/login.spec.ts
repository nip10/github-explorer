import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const { TEST_EMAIL, TEST_PASSWORD } = process.env;

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error(
    "Please set the TEST_EMAIL and TEST_PASSWORD environment variables"
  );
}

test("should login user and redirect to homepage", async ({ page }) => {
  // Start from the index page
  await page.goto("/");
  // Click Login link (header)
  await page.getByRole("link", { name: "Login" }).click();
  // The new URL should be "/auth/login"
  await expect(page).toHaveURL("/auth/login");
  // Fill the form
  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Password").fill(TEST_PASSWORD);
  // Click Login button (submit form)
  await page.getByRole("button", { name: "Login" }).click();
  // The new URL should be "/"
  await expect(page).toHaveURL("/");
  // The new page should contain an h2 with "My Bookmarks"
  await expect(
    page.getByRole("heading", { name: "My Bookmarks" })
  ).toContainText("My Bookmarks");
});
