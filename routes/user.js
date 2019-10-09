const express = require("express");
const router = express.Router();
const User = require("../models/User");

const uploader = require("../configs/cloudinary");

router.post("/", (req, res) => {
  const username = req.body.username;
  const profilePic = req.body.profilePic;
  const travelInterests = req.body.travelInterests;

  User.create({
    username: username,
    profilePic: profilePic,
    travelInterests: travelInterests
  })
    .then((user) => {
      req.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.find({ _id: id })
    .then((user) => {
      console.log("Here are the data for the user :", user);
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get;

router.post("/add-image", uploader.single("profilePic"), (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

router.patch("/update", (req, res) => {
  const { username, profilePic, travelInterests } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { username, profilePic, travelInterests },
    { new: true }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/updateFollower", (req, res) => {
  console.log(req.body.id);
  const { id } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(id, {
    $push: { followers: userId }
  });

  User.findByIdAndUpdate(userId, { $push: { following: id } });
});

module.exports = router;
