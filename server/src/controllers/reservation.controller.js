import mongoose from "mongoose";
import Reservation from "../models/Reservation";


export const createReservation = async (req, res) => {
  const { totalAmount, bikes } = req.body;

  try {
    const newReservation = new Reservation({
      totalAmount,
      bikes,
      user: req.user._id,
      restaurant,
      statusLog: {
        placed: new Date().toISOString(),
      },
    });

    const orderSaved = await newReservation.save();    
  
    res.status(201).json(orderSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getReservations = async (req, res) => {
  const { isRestaurant, isUser } = req.user;

  if (req.query.restaurant && !mongoose.Types.ObjectId.isValid(req.query.restaurant)){
    return res.status(400).json({ message: "Invalid restaurant Id" });
  }

  let query = {
    ...req.query
  };

  if (isRestaurant) {
    const { blocked } = req.user;
    if (req.query.user && !mongoose.Types.ObjectId.isValid(req.query.user)){
      return res.status(400).json({ message: "Invalid user Id" });
    }

    if (req.query.user && blocked.includes(req.query.user)) {
      return res.status(400).json({ message: "You can't request the orders from a  blocked user" });
    }

    if (query.restaurant && !req.user.restaurants.includes(query.restaurant)) {
      return res.status(403).json({ message: "You can't filter orders from that restaurant" });
    }
    if (!query.restaurant) {
      query.restaurant = { $in: req.user.restaurants }
    }
    if (!req.query.user) {
      query.user = {
        $nin: blocked,
      };
    }
  } else if (isUser) {
    delete query.user;
    query.user = req.user._id;
  
    const blacklistedFrom = await findBlackListedRestaurants(req.user._id);
    query.restaurant = {
      $nin: blacklistedFrom,
    };
  }

  console.log(query);

  const orders = await Reservation
    .find(query)
    .sort({ createdAt: 'desc' })
    .populate("bikes")
    .populate({ path: "restaurant", select: ["name", "description"]})
    .populate({ path: "user", select: ["name", "email"]});

  return res.status(200).json(orders);
};

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
