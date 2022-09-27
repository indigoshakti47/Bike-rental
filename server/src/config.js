import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://saqibghaffar324@gmail.com:freecodecamp.org@cluster0.alnap.mongodb.net/?retryWrites=true&w=majority',
  PORT: process.env.PORT || 4000,
  SECRET: process.env.SECRET
};
