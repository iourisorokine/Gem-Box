const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", (req, res) => {
  const username = req.body.username;
  const profilePic = req.body.profilePic;
  const travelInterests = req.body.travelInterests;

  User.create({
    username: username,
    profilePic: profilePic,
    travelInterests: travelInterests
  })
    .then(user => {
      req.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(user => {
      console.log("user db", user);
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

router.patch("/update", (req, res) => {
  const { username, profilePic, travelInterests } = req.body;

  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { username, profilePic, travelInterests },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
