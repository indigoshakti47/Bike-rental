import pkg from 'mongoose';
const { Schema, model } = pkg;

const bikeSchema = new Schema(
  {
    model: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    imgURL:
    {
      data: Buffer,
      contentType: String
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Bike", bikeSchema);