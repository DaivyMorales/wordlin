import { Schema, model, models } from "mongoose";

export type TUser = {
  email: string;
  name: string;
  password: string;
  role: string;
};

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.UserSchema || model<TUser>("UserSchema", userSchema);
