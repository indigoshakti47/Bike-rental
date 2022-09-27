import pkg from 'mongoose';
const { Schema, model } = pkg;

const reservationSchema = new Schema(
  {
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['available', 'reserved'],
      default: 'available',
    },
    bikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bike",
      },
    ],
    statusLog: {
      type: Map,
      of: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Reservation", reservationSchema);
