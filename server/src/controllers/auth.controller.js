import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

const mapUser = async (user) => {
  const roles = await Role.find({ _id: { $in: user.roles } });

  return {
    name: user.name,
    email: user.email,
    id: user._id,
    roles: roles.map(role => role.name),
  }
}

export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const { name, email, password, roles } = req.body;
    // Creating a new User Object
    const newUser = new User({
      name,
      email,
      password: await User.encryptPassword(password),
    });

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });

      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    const mapedUser = await(mapUser(savedUser));

    return res.status(200).json({ token, user: mapedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {

    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(401).json({ message: "Invalid Credentials" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Credentials",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    const mapedUser = await(mapUser(userFound));

    res.json({ token, user: mapedUser });
  } catch (error) {
    console.log(error);
  }
};
