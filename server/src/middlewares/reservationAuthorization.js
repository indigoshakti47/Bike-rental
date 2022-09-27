import mongoose from "mongoose";
import Meal from "../models/Meal";
import Order from "../models/Order";

export const isValidOrder = async (req, res, next) => {
  try {
    const { bikes, restaurant } = req.body;

    if (!bikes || !bikes.length) {
      return res.status(400).json({ message: "You need to provide a list of bikes" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurant)) {
      return res.status(400).json({ message: "Invalid Restaurant" });
    }
    
    const resturantObject = await Restaurant.findById(restaurant);

    if (!resturantObject) {
      return res.status(404).json({ message: "Restaurant doesn't exist" });
    }
    const mealQuery = await Meal.find({ '_id': { $in: bikes }, restaurant });
    
    let hasNotFound = false;

    const mealObjects = bikes.map((mealId) => {
      const found = mealQuery.find(({_id}) => _id.toString() === mealId);

      if (!found) {
        hasNotFound = true;
      }

      return found;
    });
    
    if (hasNotFound) {
      return res.status(400).json({ message: "All the bikes need to be from the same restaurant" });
    }

    req.body.totalAmount = mealObjects.reduce((acc, meal) => acc + meal.price, 0);

    next();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Meal not found." });
    }
    res.status(500).json(error);
  }
}

export const statusGuard = async (req, res, next) => {
  try {
    const { isRestaurant, isUser, _id: userId, restaurants } = req.user;
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (isUser && order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can't modify this order" });
    }

    if (isRestaurant && !restaurants.includes(order.restaurant)) {
      return res.status(403).json({ message: "You can't modify this order" });
    }

    req.order = order;

    switch (status) {
      case "reserved":
        if (isUser && order.status === "reserved") return next();
        break;
      case "available":
        if (isRestaurant && order.status === "available") return next();
        break;
    }

    return res.status(400).json({ message: "Invalid status change" });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(500).json(error);
  }
};
