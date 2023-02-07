import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

const { TEST_EMAIL, TEST_PASSWORD } = process.env;

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error(
    "Please set the TEST_EMAIL and TEST_PASSWORD environment variables"
  );
}

test.use({
  browserName: "chromium",
});

test("should bookmark repo", async ({ page, isMobile, browserName }) => {
  test.skip(!!isMobile, "ugly hack to run this only once");
  // PRE TEST - Login
  // Start from the login page
  await page.goto("/auth/login");
  // Fill the form
  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Password").fill(TEST_PASSWORD);
  // Click Login button (submit form)
  await page.getByRole("button", { name: "Login" }).click();
  // The new URL should be "/"
  await expect(page).toHaveURL("/");
  await page.waitForLoadState("networkidle");
  // ACTUAL TEST
  // Click on the first slide bookmark icon
  const firstSlide = await page.waitForSelector(
    "#topic-vue > div:nth-child(2) > div > div > div:nth-child(1)"
  );
  firstSlide.hover();
  // Make sure the bookmark icon is outlined
  const firstSlideBookmarkIconSvgOutlined = await firstSlide.waitForSelector(
    "svg#star_outlined"
  );
  expect(firstSlideBookmarkIconSvgOutlined).toBeTruthy();
  // Click on the bookmark icon (requires hover on desktop)
  const bookmarkIcon = await firstSlide.waitForSelector("div");
  await bookmarkIcon.click();
  // Check if the repo shows up in the bookmarks
  const myBookmarks = await page.waitForSelector("section#my-bookmarks");
  const myBookmarksRepo = await myBookmarks.waitForSelector(
    "div > div > div > div:nth-child(1)"
  );
  expect(myBookmarksRepo).toBeTruthy();
  // Check if the bookmark icon has changed (is now filled)
  firstSlide.hover();
  const firstSlideBookmarkIconSvgFilled = await firstSlide.waitForSelector(
    "svg#star_filled"
  );
  expect(firstSlideBookmarkIconSvgFilled).toBeTruthy();
});
