import mongoose, { Schema, model } from "mongoose";

export type TCard = {
  wordOne: string;
  wordTwo: string;
};

const cardSchema = new Schema<TCard>(
  {
    wordOne: {
      type: String,
      trim: true,
    },
    wordTwo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Card = mongoose.models.Card || model<TCard>("Card", cardSchema);

export default Card;
