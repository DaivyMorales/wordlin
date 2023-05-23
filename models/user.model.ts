import { Schema, model, models } from "mongoose";

type TUser = {
  email: string;
  name: string;
  password: string;
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.UserSchema || model<TUser>("UserSchema", userSchema);
