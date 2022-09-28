import mongoose from "mongoose";
import Bike from "../models/Bike.js";

export const createBike = async (req, res) => {
  const { model, color, rating, imgURL, location,status, bike } = req.body;
  try {
    const newBike = new Bike({
      model,
      color,
      rating,
      imgURL,
      location,
      status,
      bike,
    });
    const bikeSaved = await newBike.save();    
    res.status(201).json(bikeSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getBikes = async (req, res) => {
  if (req.query.bike && !mongoose.Types.ObjectId.isValid(req.query.bike)){
    res.status(400).json({ message: "Invalid manager Id" });
  }
  const bikes = await Bike.find(req.query || {});
  return res.json(bikes);
};

export const updateBikeById = async (req, res) => {
  try {
    const { bikeId } = req.params;
    
    const updatedBikes = await Bike.findByIdAndUpdate(
      bikeId,
      req.body,
      {
        new: true,
        useFindAndModify: true
      },
      
    );
    res.status(200).json(updatedBikes);
  } catch (error) {
    res.status(500).json(error);
  }
};  

export const getBikeById = async(req, res) => {
  try {
    const { bikeId } = req.params;
    const bike = await Bike.findById(bikeId);
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json(error);
  }
} 


export const deleteBikeById = async (req, res) => {
  const { bikeId } = req.params;
  await Bike.findByIdAndDelete(bikeId);
  res.status(204).json();
};
