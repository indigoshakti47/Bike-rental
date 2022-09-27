import Role from "../models/Role";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "manager" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
