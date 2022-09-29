import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import Role from "../models/Role.js";


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
    const orderSaved = await newReservation.save();
    res.status(201).json(orderSaved);
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
  const { orderId } = req.params;

  req.order.statusLog.set(status, new Date().toISOString())

  const newReservation = {
    status,
    statusLog: req.order.statusLog
  };

  const updatedReservation = await Reservation.findByIdAndUpdate(orderId, newReservation)

  return res.status(200).json(updatedReservation);
}
