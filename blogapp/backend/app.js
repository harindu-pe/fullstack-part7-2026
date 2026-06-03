const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const config = require("./utils/config");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

module.exports = app;
