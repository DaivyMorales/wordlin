import { timeStamp } from "console";
import { Schema, model, models } from "mongoose";

export type TCard = {
  wordOne: String;
  wordTwo: String;
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

export default models.Card || model<TCard>("Card", cardSchema);
