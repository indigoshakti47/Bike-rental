import mongoose from "mongoose";
import Bike from "../models/Bike.js";
import Rating from "../models/Rating.js";


export const createBike = async (req, res) => {
  const { model, color, imgURL, location, status, bike } = req.body;
  try {
    const newBike = new Bike({
      model,
      color,
      imgURL,
      location,
      status,
      bike,
    });
    const bikeSaved = await newBike.save();
    res.status(201).json(bikeSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getBikes = async (req, res) => {
  if (req.query.bike && !mongoose.Types.ObjectId.isValid(req.query.bike)) {
    res.status(400).json({ message: "Invalid manager Id" });
  }
  let bikes = []
  console.log(req.query)
  if (req.query.rating) {
    bikes = await Bike.aggregate([
      { $lookup: { from: 'ratings', localField: "_id", foreignField: "bike", as: "ratings" } },
      { $unwind: { path: "$ratings" } },
      { $match: { $expr: { $gt: [{ $avg: '$ratings.rating' }, Number(req.query.rating)] }, status: req.query.status } },
      { $group: { _id: '$_id', rating: { $avg: "$ratings.rating" }, "model": { "$first": "$model" }, "color": { "$first": "$color" }, "location": { "$first": "$location" }, "status": { "$first": "$status" }, "imgURL": { "$first": "$imgURL" } } }

    ])
    console.log(bikes)
  } else {

    bikes = await Bike.aggregate([
      { $match: req.query || {} },
      { $lookup: { from: 'ratings', localField: "_id", foreignField: "bike", as: "ratings" } },
      { $unwind: { path: "$ratings", preserveNullAndEmptyArrays: true } },
      { $group: { _id: '$_id', rating: { $avg: "$ratings.rating" }, "model": { "$first": "$model" }, "color": { "$first": "$color" }, "location": { "$first": "$location" }, "status": { "$first": "$status" }, "imgURL": { "$first": "$imgURL" } } }
    ])
  }

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

export const getBikeById = async (req, res) => {
  try {
    const { bikeId } = req.params;
    const bike = await Bike.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(bikeId) } },
      { $lookup: { from: 'ratings', localField: "_id", foreignField: "bike", as: "ratings" } },
      { $unwind: { path: "$ratings", preserveNullAndEmptyArrays: true } },
      { $group: { _id: '$_id', rating: { $avg: "$ratings.rating" }, "model": { "$first": "$model" }, "color": { "$first": "$color" }, "location": { "$first": "$location" }, "status": { "$first": "$status" }, "imgURL": { "$first": "$imgURL" }, "createdAt": { "$first": "$createdAt" } } }
    ])
    res.status(200).json(bike[0]);
  } catch (error) {
    res.status(500).json(error);
  }
}


export const deleteBikeById = async (req, res) => {
  const { bikeId } = req.params;
  await Bike.findByIdAndDelete(bikeId);
  res.status(204).json();
};
