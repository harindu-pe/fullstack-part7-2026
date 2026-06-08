const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post("/api/testing/reset");
    // create a user for the backend here
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    // go to page
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    // ...
    const locator1 = page.getByRole("heading", { name: "Login" });
    await expect(locator1).toBeVisible();

    const locator2 = page.getByRole("button", { name: "login" });
    await expect(locator2).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test.only("fails with wrong credentials", async ({ page }) => {
      // ...
      await loginWith(page, "mluukkai", "wrongpassword");
      await expect(
        page.getByText("Invalid username or password"),
      ).toBeVisible();
    });
  });
});
