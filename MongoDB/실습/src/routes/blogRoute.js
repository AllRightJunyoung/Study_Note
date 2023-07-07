const { Router } = require("express");
const blogRouter = Router();
const { commentRouter } = require("./commentRoute");
const { Blog, User } = require("../models");

const { isValidObjectId } = require("mongoose");

blogRouter.use("/:blogId/comment", commentRouter);

blogRouter.post("/", async (req, res) => {
  try {
    const { title, content, islive, userId } = req.body;
    if (typeof title !== "string") return res.status(400).send({ err: "title is required" });
    if (typeof content !== "string") return res.status(400).send({ err: "content is required" });
    if (islive && islive !== "boolean") return res.status(400).send({ error: "islive must be a boolean" });
    if (!isValidObjectId(userId)) return res.status(400).send({ error: "userId is invalid" });

    let user = await User.findById(userId); //userId 기반으로 user찾기
    if (!user) return res.status(400).send({ error: "user does not exist" });

    let blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.send({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).limit(10);
    return res.send({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.get("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!isValidObjectId(blogId)) return res.status(400).send({ error: "blogId is invalid" });
    const blog = await Blog.findOne({ _id: blogId });
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.put("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;
    if (typeof title !== "string") return res.status(400).send({ error: "title is required" });
    if (typeof content !== "string") return res.status(400).send({ error: "content is required" });

    const blog = await Blog.findOneAndUpdate({ _id: blogId }, { title, content }, { new: true });
    return res.send({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
blogRouter.patch("/:blogId/live", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId)) return res.status(400).send({ error: "blogId is invalid" });
    const { islive } = req.body;
    if (typeof islive !== "boolean") return res.status(400).send({ error: "boolean islive is required!" });

    const blog = await Blog.findByIdAndUpdate(blogId, { islive }, { new: true });
    return res.send({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
blogRouter.patch("/:blogId/live", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
