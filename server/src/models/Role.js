import { Schema, model } from "mongoose";

export const ROLES = ["user", "manager"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
