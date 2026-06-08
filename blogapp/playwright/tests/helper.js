const loginWith = async (page, username, password) => {
  await page.getByRole("textbox").first().fill(username);
  await page.getByRole("textbox").last().fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, blog) => {
  await page.getByRole("button", { name: "create new blog" }).click();

  await page.getByRole("textbox", { name: "title" }).fill(blog.title);
  await page.getByRole("textbox", { name: "author" }).fill(blog.author);
  await page.getByRole("textbox", { name: "url" }).fill(blog.url);

  await page.getByRole("button", { name: "create" }).click();
};

const likeTimes = async (page, button, n) => {
  for (let i = 0; i < n; i++) {
    await button.click();
    await button
      .locator("..")
      .getByText(`likes ${i + 1}`)
      .waitFor();
  }
};

export { loginWith, createBlog, likeTimes };
