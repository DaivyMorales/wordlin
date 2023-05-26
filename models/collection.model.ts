import { Schema, model, models } from "mongoose";
import Card from "./card.model";

export type TCollection = {
  name: String;
  cards: String[];
};

const collectionSchema = new Schema<TCollection>(
  {
    name: {
      type: String,
      trim: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Collection ||
  model<TCollection>("Collection", collectionSchema);
