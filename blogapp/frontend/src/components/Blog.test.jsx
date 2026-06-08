import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  const creator = {
    username: "totester",
    name: "Tommy Tester",
    id: "6836bfea4b580b29430b00b7",
  };

  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: creator,
  };

  test("blog's title and author are displayed but does not render its URL or number of likes", () => {
    render(<Blog blog={blog} />);

    screen.getByText("Canonical string reduction", { exact: false });
    screen.getByText("Edsger W. Dijkstra", { exact: false });

    const url = screen.queryByText(
      "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    );
    expect(url).not.toBeVisible();

    const likes = screen.queryByText("12");
    expect(likes).not.toBeVisible();
  });

  test("blog's URL and number of likes are shown when the view button is clicked", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} />);

    const user = userEvent.setup();

    const button = screen.getByText("view");
    await user.click(button);

    const url = screen.queryByText(
      "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    );
    expect(url).toBeVisible();

    const likes = screen.queryByText("12");
    expect(likes).toBeVisible();
  });

  test("if the like button is clicked twice, the event handler is called twice", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} addLike={mockHandler} currentUser={creator} />);

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
