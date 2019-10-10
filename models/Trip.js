const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    name: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    gemsVisited: [{ type: Schema.Types.ObjectId, ref: "Gem" }],

    startDate: {
      type: Date

      //default: new Date()
    },
    endDate: {
      type: Date

      // default: new Date()
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
