import mongoose from "mongoose";
import Bike from "../models/Bikes";

export const createBike = async (req, res) => {
  const { model, color, rating, imgURL, location, restaurant } = req.body;

  try {
    const newBike = new Bike({
      model,
      color,
      rating,
      imgURL,
      location,
      availability,
      restaurant,
    });

    const bikeSaved = await newBike.save();    
  
    res.status(201).json(bikeSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getBikes = async (req, res) => {
  if (req.query.restaurant && !mongoose.Types.ObjectId.isValid(req.query.restaurant)){
    res.status(400).json({ message: "Invalid manager Id" });
  }

  const bikes = await Bike.find(req.query || {});
  return res.json(bikes);
};

export const updateBikeById = async (req, res) => {
  try {
    const { bikesId } = req.params;
    
    const updatedBikes = await Bike.findByIdAndUpdate(
      bikesId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedBikes);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBikeById = async (req, res) => {
  const { bikesId } = req.params;
  await Bike.findByIdAndDelete(bikesId);
  res.status(204).json();
};
