const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

const blog1 = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
};

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

    test("fails with wrong credentials", async ({ page }) => {
      // ...
      await loginWith(page, "mluukkai", "wrongpassword");
      await expect(
        page.getByText("Invalid username or password"),
      ).toBeVisible();
    });
  });

  describe.only("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });
    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, blog1);
      await expect(
        page.getByText("React patternsMichael Chanview"),
      ).toBeVisible();
    });
    test("created blog can be liked", async ({ page }) => {
      await createBlog(page, blog1);
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });
  });
});
