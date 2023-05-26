import mongoose from "mongoose";
import { Schema, Types, model, models} from "mongoose";
import Card from "./card.model";
import User from "./user.model";

export type TCollection = {
  name: String;
  Card: Types.ObjectId[];
  User: Types.ObjectId;
};

const collectionSchema = new Schema<TCollection>(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    Card: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Collection ||
  model<TCollection>("Collection", collectionSchema);
