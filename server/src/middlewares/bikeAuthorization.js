import mongoose from "mongoose";
import Bike from "../models/Bike.js";

export const canCreateBike = async (req, res, next) => {
  try {
    const { bike: bikeId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
      return res.status(400).json({ message: "Invalid resturant" });
    }

    // if (!req.user.bikes.includes(bikeId)) {
    //   return res.status(403).json({ message: "You can't create a meal for this restaruant" });
    // }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

