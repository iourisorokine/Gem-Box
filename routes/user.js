const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/:userId", (req, res) => {
  const id = req.params.userId;

  User.findById(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
