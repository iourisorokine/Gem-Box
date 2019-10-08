const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

router.get("/:creatorid", (req, res) => {
  console.log("Get request");
  const creatorid = req.params.creatorid;
  console.log("Received Param on Server with", creatorid);
  Trip.find({ creator: creatorid })
    .then((trips) => {
      res.json(trips);
      console.log("Send data back", trips);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update", (req, res) => {
  console.log("Put Function received Database, body:", req.body);
  let { gemId, gemsVisited } = req.body;
  Trip.findByIdAndUpdate(
    gemId,
    { $set: { gemsVisited: gemsVisited } },
    { new: true }
  )
    .then((updatedtrip) => {
      console.log("Data Updated, new updates:", updatedtrip);
      res.json(updatedtrip);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/create", (req, res) => {
  console.log(req.name);
  let { title, creator, name } = req.body;
  Trip.create({
    title,
    creator,
    name
  })
    .then((newtrip) => {
      console.log("trip created");
      res.json(newtrip);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
