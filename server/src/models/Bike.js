import { Schema, model } from "mongoose";

const bikeSchema = new Schema(
  {
    model: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    imgURL: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Bike", bikeSchema);
