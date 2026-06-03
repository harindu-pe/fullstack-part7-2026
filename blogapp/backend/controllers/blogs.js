const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.likes = blog.likes ?? 0;

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
