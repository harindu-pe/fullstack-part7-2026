const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

const blog1 = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
};

const blog2 = {
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
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
    // create a second user for the backend here
    await request.post("/api/users", {
      data: {
        name: "Admin User",
        username: "admin",
        password: "admin",
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
    test("user who added the blog can delete the blog", async ({ page }) => {
      await createBlog(page, blog1);
      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("React patternsMichael Chanview"),
      ).not.toBeVisible();
    });
    test("only blog creator can see delete button", async ({ page }) => {
      await createBlog(page, blog1);
      await page.getByRole("button", { name: "log out" }).click();

      await loginWith(page, "admin", "admin");
      await page.getByRole("button", { name: "view" }).click();

      await expect(
        page.getByRole("button", { name: "remove" }),
      ).not.toBeVisible();
    });
  });
});
