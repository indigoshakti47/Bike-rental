import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import Role from "../models/Role.js";
import User from "../models/User.js";
import Bike from "../models/Bike.js";



export const createReservation = async (req, res) => {
  const { totalAmount, startDate, endDate } = req.body;
  const { bikeId } = req.params
  try {
    const newReservation = new Reservation({
      totalAmount,
      startDate,
      endDate,
      bike: bikeId,
      user: req.user._id,
      statusLog: {
        placed: new Date().toISOString(),
      },
    });
    
    const reservationSaved = await newReservation.save();
    res.status(201).json(reservationSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const index = async (req, res) => {
  const { bikeId } = req.params
  try {
    let reservations = []
    const foundRoles = await Role.findById(req.user.roles[0]);
    if (bikeId && !mongoose.Types.ObjectId.isValid(bikeId)) {
      res.status(400).json({ message: "Invalid bike Id" });
    }
    if (foundRoles.name === 'user') {
      reservations = await Reservation.find({ bike: bikeId, user: req.user._id })
    } else {
      reservations = await Reservation.find(req.query || {})
    }
    res.status(201).json(reservations);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const { reservationId } = req.params;


  const newReservation = {
    status
  };

  const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, newReservation)

  return res.status(200).json(updatedReservation);
}


export const byUsers = async (req, res) => {
  try {
    const reservations = await User.aggregate([
      { $lookup: { from: 'reservations', localField: "_id", foreignField: "user", as: "reservations" } },
      { $unwind: "$reservations" },
      { $lookup: { from: "bikes", localField: "reservations.bike", foreignField: "_id", as: "reservations.bike" } },
      { $unwind: "$reservations.bike" },
      {
        $group: {
          _id: "$_id", "name" : { "$first": "$name" }, "createdAt" : { "$first": "$createdAt" }, "email" : { "$first": "$email" }, "reservations": { "$push": "$reservations"}
        }
      }
 
    ])
    res.status(201).json(reservations);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const reservedBikes = async (req, res) => {
  try {
    const reservations = await Bike.aggregate([
      { $lookup: { from: 'reservations', localField: "_id", foreignField: "bike", as: "reservations" } },
      { $unwind: "$reservations" },
      { $lookup: { from: "users", localField: "reservations.user", foreignField: "_id", as: "reservations.user" } },
      { $unwind: "$reservations.user" },
      {
        $group: {
          _id: "$_id",  "model": { "$first": "$model" }, "color": { "$first": "$color" }, "location": { "$first": "$location" }, "status": { "$first": "$status" }, "imgURL": { "$first": "$imgURL" }, "createdAt": { "$first": "$createdAt" }, "reservations": { "$push": "$reservations"}
        }
      }
 
    ])
    res.status(201).json(reservations);
  } catch (error) {
    return res.status(500).json(error);
  }
}

