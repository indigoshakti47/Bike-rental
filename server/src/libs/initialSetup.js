import Role from "../models/Role.js";
import User from "../models/User.js";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "manager" }).save(),
    ]);

  } catch (error) {
    console.error(error);
  }
};
