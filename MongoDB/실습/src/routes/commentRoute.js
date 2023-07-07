const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { isValidObjectId } = require("mongoose");
const { Blog, User, Comment } = require("../models");

commentRouter.post("/", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content, userId } = req.body;

    if (!isValidObjectId(blogId)) {
      return res.status(400).send({ error: "blogId is invalid" });
    }
    if (!isValidObjectId(userId)) {
      return res.status(400).send({ error: "userId is invalid" });
    }
    if (typeof content !== "string") return res.status(400).send({ error: "content is required" });

    const [blog, user] = await Promise.all([
      await Blog.findByIdAndUpdate(blogId),
      await User.findByIdAndUpdate(userId),
    ]);

    if (!blog || !user) return res.status(400).send({ error: "blog or user does not exist" });
    if (!blog.islive) return res.status(400).send({ error: "blog is not avaliable" });

    const comment = new Comment({ content, user, blog });
    await comment.save();
    return res.send({ comment });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

commentRouter.get("/", async (req, res) => {
  const { blogId } = req.params;

  if (!isValidObjectId(blogId)) {
    return res.status(400).send({ error: "blogId is invalid" });
  }
  const comments = await Comment.find({ blog: blogId });
  return res.send({ comments });
});

module.exports = { commentRouter };
