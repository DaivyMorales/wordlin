import { User } from "next-auth";
import { IUserService } from "./IUserService";
import { dbConnect } from "@/utils/db";
import UserSchema from "@/models/user.model";

export class InMemoryUserService implements IUserService {
  async signInCredentials(email: string, password: string): Promise<User> {
    dbConnect();

    const user = await UserSchema.findOne({ email, password }).exec();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return user;
  }
}
export const userService = new InMemoryUserService();
