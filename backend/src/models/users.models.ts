import mongoose, { Schema } from "mongoose";
import { User } from "../types/usersTypes";

const UserSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "mecanic"],
      default: "seller",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
