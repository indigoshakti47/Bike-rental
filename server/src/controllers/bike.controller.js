import mongoose from "mongoose";
import Bike from "../models/Bike.js";

export const createBike = async (req, res) => {
  const { model, color, rating, imgURL, location,status, bike } = req.body;
  console.log('bike----------------------')

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
    console.log(newBike)

    const bikeSaved = await newBike.save();    
    console.log('bike----------------------')

    res.status(201).json(bikeSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getBikes = async (req, res) => {

  if (req.query.bike && !mongoose.Types.ObjectId.isValid(req.query.bike)){
    console.log('bike----------------------')

    res.status(400).json({ message: "Invalid manager Id" });
  }

  const bikes = await Bike.find(req.query || {});
  console.log(bikes);

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

export const getBikeById = async(req, res) => {
  try {
    const { bikeId } = req.params;
    console.log(bikeId)
    const bike = await Bike.findById('6333af345ccd9ea47a525b2b');
    res.status(200).json(bike);
  } catch (error) {
    res.status(500).json(error);
  }
} 


export const deleteBikeById = async (req, res) => {
  const { bikesId } = req.params;
  await Bike.findByIdAndDelete(bikesId);
  res.status(204).json();
};
