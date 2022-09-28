import jwt from "jsonwebtoken";

import config from "../config.js";
import User from "../models/User.js";
import Role from "../models/Role.js";

import { capitalize } from '../utils/helpers.js';

export const mapRoles = (roles) => {
  const result = {};

  for (const role of roles) {
    const key = `is${capitalize(role.name)}`;
    result[key] = true;
  }
  
  return result;
}

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });
    const roles = await Role.find({ _id: { $in: user.roles } });
    req.user = {
      ...user._doc,
      ...mapRoles(roles),
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isUser = async (req, res, next) => {
  try {

    if (req.user.isUser) {
      return next();
    }

    return res.status(403).json({ message: "Require User Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

export const isManager = async (req, res, next) => {
  try {
console.log(req.user.isManager)
    if (req.user.isManager) {
      return next();
    }

    return res.status(403).json({ message: "User Role Invalid!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};


