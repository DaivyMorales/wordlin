import { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "../../../models/user.model";

export default async function idPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        const userFound = await UserSchema.findById(id);

        if (!userFound) return res.status(404).json("User doesn't exist");

        return res.status(200).json(userFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const user = await UserSchema.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!user) return res.status(404).json("User not found");

        return res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "DELETE":
      try {
        const deletedUser = await UserSchema.findByIdAndRemove(id);

        if (!deletedUser) return res.status(404).json("User not found");

        return res.status(200).json("User deleted successfully");
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
