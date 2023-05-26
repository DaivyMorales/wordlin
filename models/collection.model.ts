import { Schema, Types, model, models } from "mongoose";
import Card from "./card.model";
import User from "./user.model";
import { TUser } from "./user.model";

export type TCollection = {
  name: String;
  cards: String[];
  user: Types.ObjectId;
};

const collectionSchema = new Schema<TCollection>(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Collection ||
  model<TCollection>("Collection", collectionSchema);
