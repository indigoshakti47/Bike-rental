import mongoose from "mongoose";
import Bike from "../models/Bike.js";
import Reservation from "../models/Reservation.js";


export const isValidReservation = async (req, res, next) => {
  try {
    const { bikeId } = req.params;
    if (!bikeId) {
      return res.status(400).json({ message: "You need to provide Bike" });
    }
    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
      return res.status(400).json({ message: "Invalid Bike" });
    }
    const bikeObject = await Bike.findById(bikeId);

    if (!bikeObject) {
      return res.status(404).json({ message: "Bike doesn't exist" });
    }
    next();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Bike not found." });
    }
    res.status(500).json(error);
  }
}
export const isBikeAvailable = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const { bikeId } = req.params
    const reservation = await Reservation.find({
      bike: bikeId,
      "$expr": {
        "$and": [
          {
            $lte: [
              "$startDate",
              new Date(startDate)
            ]
          },
          {
            $gte: [
              "$endDate",
              new Date(endDate)
            ]
          }
        ]
      }
    })
    if (reservation.length) {
      return res.status(404).json({ message: "Bike already book on selected dates" });
    }
    next();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Bike not found." });
    }
    res.status(500).json(error);
  }
    
}