const { test, describe, after, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("when there are initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("right amount of blogs are returned", async () => {
    const result = await api.get("/api/blogs");

    assert.strictEqual(result.body.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
