
import mongoose from "mongoose";
import User from "../models/User.js";
import Role from "../models/Role.js";


export const getUsers = async (req, res) => {
    if (req.query.user && !mongoose.Types.ObjectId.isValid(req.query.user)) {
        res.status(400).json({ message: "Invalid manager Id" });
    }
    const users = await User.find(req.query || {}).populate(
        "roles"
    );
    return res.json(users);
};

export const createUser = async (req, res) => {
    const { name, email, password, roles } = req.body;
    try {
        const newUser = new User({
            name,
            email,
            password: await User.encryptPassword(password),
        });
        if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }
        const userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password, roles } = req.body;
        const foundRoles = await Role.find({ name: { $in: roles } });
        const role = foundRoles.map((role) => role._id);
        const updatedusers = await User.findByIdAndUpdate(
            userId,
            {name,
            email,
            roles: role,
            password: await User.encryptPassword(password)
            },
            {
                new: true,
                useFindAndModify: true
            },

        );
        res.status(200).json(updatedusers);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const deleteUserById = async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(204).json();
};
