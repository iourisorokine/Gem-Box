const express = require("express");
const router = express.Router();
const Wisdom = require("../models/Wisdom");

router.get("/", (req, res) => {
  Wisdom.find()
    .then((n) => {
      let RndQuote = n[Math.floor(Math.random() * n.length)];
      res.json(RndQuote);
    })
    .catch((err) => {
      console.log("Error");
    });
});

module.exports = router;
