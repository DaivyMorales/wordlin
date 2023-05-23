import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import UserSchema from "../../../models/user.model";

export default async function indexUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const users = await UserSchema.find().sort({ createdAt: "desc" });
        return res.status(200).json(users);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "POST":
      try {
        const { email, name, password } = body;

        const newUser = new UserSchema({ email, name, password });

        const userSaved = await newUser.save();

        return res.status(200).json(userSaved);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
