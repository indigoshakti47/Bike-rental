import mongoose from "mongoose";
import User from "../models/User";

export const blockUserGuard = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!req.user.isManager) {
      return res.status(403).json({ message: "Regular users can't block / unblock other users" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const userToBlock = await User.findById(userId);

    if (!userToBlock) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}
