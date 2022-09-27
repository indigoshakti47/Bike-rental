import mongoose from "mongoose";
import Bike from "../models/Bike.js";

export const canCreateBike = async (req, res, next) => {
  try {
    const { restaurant: restaurantId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid resturant" });
    }

    if (!req.user.restaurants.includes(restaurantId)) {
      return res.status(403).json({ message: "You can't create a meal for this restaruant" });
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

export const isMealOwner = async (req, res, next) => {
  try {
    const { bikeId } = req.params;
    const { restaurant: restaurantId } = req.body;

    if (restaurantId) {
      return res.status(400).json({ message: "Restaurant can't be udated in meals" });
    }

    const bike = await Bike.findById(bikeId);
  
    if (!bike) {
      return res.status(404).json({ message: "Meal not found." });
    }

    const isRestaurantOwner = req.user.restaurants.includes(bike.restaurant);

    if (!isRestaurantOwner) {
      return res.status(403).json({ message: "You can't update or delete meals from this restaurant" });
    }

    next();
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Meal not found." });
    }
    res.status(500).json(error);
  }
};

