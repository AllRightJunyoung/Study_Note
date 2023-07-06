const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (error) {
    return res.status(500).send({ err: err.meesage });
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: "invalid userId" });
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    let { username, name } = req.body;
    if (!username) return res.status(400).send({ err: "username is required" });
    if (!name || !name.first || !name.last)
      return res.status(400).send({ err: "Both first and last names are required" });

    const user = new User(req.body);
    await user.save();
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: "invalid userId" });
    const user = await User.findOneAndDelete({ _id: userId });
    return res.send({ user });
  } catch (error) {}
});

userRouter.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: "invalid userId" });
    const { age, name } = req.body;
    if (!age && !name) return res.status(400).send({ error: "age or name is required!" });
    if (age && typeof age !== "number") return res.status(400).send({ error: "age must be a number" });
    if (name && typeof name.first !== "string" && typeof name.last !== "string")
      return res.status(400).send({ error: "first and last string" });

    // let updateBody = {};
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;
    let user = await User.findById(userId);
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save();

    // const user = await User.findByIdAndUpdate(userId, updateBody, { new: true });
    return res.send({ user });
  } catch (error) {}
});

module.exports = {
  userRouter,
};
