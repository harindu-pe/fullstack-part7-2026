const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, likeTimes } = require("./helper");

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

const blog3 = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("link", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      //await expect(page.getByRole('link', { name: 'logout' })).toBeVisible()
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");
      const errorDiv = page.getByText("Invalid username or password");
      await expect(errorDiv).toBeVisible();
      // await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(
        page.getByRole("link", { name: "logout" }),
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, blog1);
    });

    describe("and a blog has been added", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, blog1);
      });

      test("a blog can be liked", async ({ page }) => {
        await page
          .getByRole("link", { name: `${blog1.title} by ${blog1.author}` })
          .click();

        page.getByText("likes 0");
        await page.getByRole("button", { name: "like" }).click();
        page.getByText("likes 1");
      });

      test("a blog can be deleted", async ({ page }) => {
        await page
          .getByRole("link", { name: `${blog1.title} by ${blog1.author}` })
          .click();

        await page.getByRole("button", { name: "remove" }).click();
        await expect(
          page.getByRole("link", { name: `${blog1.title} by ${blog1.author}` }),
        ).not.toBeVisible();
      });
    });
  });

  // describe("When logged in", () => {
  //   beforeEach(async ({ page }) => {
  //     await loginWith(page, "mluukkai", "salainen");
  //   });
  //   test("a new blog can be created", async ({ page }) => {
  //     await createBlog(page, blog1);
  //     await expect(
  //       page.getByText("React patternsMichael Chanview"),
  //     ).toBeVisible();
  //   });
  //   test("created blog can be liked", async ({ page }) => {
  //     await createBlog(page, blog1);
  //     await page.getByRole("button", { name: "view" }).click();
  //     await page.getByRole("button", { name: "like" }).click();
  //     await expect(page.getByText("likes 1")).toBeVisible();
  //   });
  //   test("user who added the blog can delete the blog", async ({ page }) => {
  //     await createBlog(page, blog1);
  //     await page.getByRole("button", { name: "view" }).click();

  //     page.on("dialog", async (dialog) => {
  //       expect(dialog.type()).toBe("confirm");
  //       await dialog.accept();
  //     });

  //     await page.getByRole("button", { name: "remove" }).click();
  //     await expect(
  //       page.getByText("React patternsMichael Chanview"),
  //     ).not.toBeVisible();
  //   });
  //   test("only blog creator can see delete button", async ({ page }) => {
  //     await createBlog(page, blog1);
  //     await page.getByRole("button", { name: "log out" }).click();

  //     await loginWith(page, "admin", "admin");
  //     await page.getByRole("button", { name: "view" }).click();

  //     await expect(
  //       page.getByRole("button", { name: "remove" }),
  //     ).not.toBeVisible();
  //   });

  //   describe("and multiple blogs exist", () => {
  //     beforeEach(async ({ page }) => {
  //       await createBlog(page, blog1);
  //       await createBlog(page, blog2);
  //       await createBlog(page, blog3);
  //     });

  //     test("blogs are ordered by the number of likes", async ({ page }) => {
  //       await page
  //         .locator("div.blog")
  //         .filter({ hasText: blog1.title })
  //         .getByRole("button", { name: "view" })
  //         .click();

  //       await page
  //         .locator("div.blog")
  //         .filter({ hasText: blog2.title })
  //         .getByRole("button", { name: "view" })
  //         .click();

  //       await page
  //         .locator("div.blog")
  //         .filter({ hasText: blog3.title })
  //         .getByRole("button", { name: "view" })
  //         .click();

  //       const button2 = page
  //         .locator("div.blog")
  //         .filter({ hasText: blog2.title })
  //         .getByRole("button", { name: "like" });

  //       const button3 = page
  //         .locator("div.blog")
  //         .filter({ hasText: blog3.title })
  //         .getByRole("button", { name: "like" });

  //       await likeTimes(page, button2, 2);
  //       await likeTimes(page, button3, 3);

  //       const blogDivs = await page.locator("div.blog").all();

  //       await expect(blogDivs[0]).toContainText(blog3.title);
  //       await expect(blogDivs[1]).toContainText(blog2.title);
  //       await expect(blogDivs[2]).toContainText(blog1.title);
  //     });
  //   });
  // });
});
