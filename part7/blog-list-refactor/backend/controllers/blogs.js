const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const {
  idValidationMiddlewear,
  tokenExtractor,
  userExtractor,
} = require("../utils/middlewear");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const errors = require("../utils/errors");

blogsRouter.use("/:id", idValidationMiddlewear);

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (req, res, next) => {
  const user = req.user;

  // Adds the new blog to the server using the request body and the found users id
  const blog = new Blog({ ...req.body, user: user._id });
  const addedBlog = await blog.save();

  // Adds the id of the new blog to the array of blog ids on the user document and saves the user
  user.blogs.push(addedBlog._id);
  await user.save();

  res.status(201).json(addedBlog);
});

// Del route
blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(204).end();
  }

  if (!blog.user) {
    return res.status(401).json({ error: "that blog dont have a user" });
  }
  if (!blog.user.toString() === user._id.toString()) {
    return next(errors.authorizationError);
  }

  // For removing the blog from the list of blog ids on the user
  user.blogs.filter((blogId) => blogId.toString() !== blog._id.toString());

  await user.save();

  await Blog.findByIdAndDelete(blog._id);

  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("user", { username: 1, id: 1 });
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
