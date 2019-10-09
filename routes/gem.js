const express = require("express");
const router = express.Router();
const Gem = require("../models/Gem");
const uploader = require("../configs/cloudinary");

// route to create a new gem
router.post("/", (req, res) => {
  const {
    title,
    description,
    good_to_know,
    image_url = "",
    category
  } = req.body;

  Gem.create({
    title,
    description,
    good_to_know,
    image_url,
    category
  })
    .then(gem => {
      req.json(gem);
    })
    .catch(err => {
      res.json(err);
    });
});

// to get the list of all gems
router.get("/", (req, res) => {
  Gem.find()
    .then(gems => {
      res.json(gems);
    })
    .catch(err => {
      res.json(err);
    });
});

// to push a new Gem
router.post("/create", (req, res) => {
  console.log("create fuction called");
  let {
    title,
    description,
    goodToKnow,
    imageUrl,
    creator,
    discovery,
    category,
    visitedDate,
    latitude,
    longitude,
    locationName
  } = req.body;
  Gem.create({
    title,
    description,
    goodToKnow,
    imageUrl,
    creator,
    discovery,
    category,
    visitedDate,
    latitude,
    longitude,
    locationName,
    likes: []
  })
    .then(newgem => {
      console.log("user created");
      res.json(newgem);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/add-image", uploader.single("imageUrl"), (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

// gets all gems of a certain user
router.get("/creator/:creatorId", (req, res) => {
  const creatorId = req.params.creatorId;
  console.log("querying the database with", creatorId);
  Gem.find({ creator: creatorId })
    .then((gem) => {
      res.json(gem);
      console.log("Got all your gems made", gem);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:gemId", (req, res) => {
  const id = req.params.gemId;

  Gem.findById(id)
    .then((gem) => {
      res.json(gem);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:gemId", (req, res) => {
  const { likes } = req.body;
  Gem.findByIdAndUpdate(req.params.gemId, { likes: likes }, { new: true })
    .then(gem => {
      res.json(gem);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
