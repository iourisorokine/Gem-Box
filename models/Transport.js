const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransportSchema = new Schema(
  {
    gemId: { type: Schema.Types.ObjectId, ref: "Gem" },
    transport: {
      type: String,
      enum: ["Train", "Plane", "Bus", "Boat", "Car", "Hike", "Bicyle"]
    },

    distance: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Transport = mongoose.model("Transport", TransportSchema);
module.exports = Transport;
