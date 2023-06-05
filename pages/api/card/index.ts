import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Card from "../../../models/card.model";

export default async function indexUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const users = await Card.find();
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
        const { wordOne, wordTwo } = body;

        const newCard = new Card({ wordOne, wordTwo });

        const cardSaved = await newCard.save();

        return res.status(200).json(cardSaved);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "DELETE":
      try {
        const cards = await Card.deleteMany();

        return res.status(200).json("Cards has been delete successfully");
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
