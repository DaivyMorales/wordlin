import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Collection from "../../../models/collection.model";
import mongoose from "mongoose";

interface TCollection extends Document {
  name: string;
  cards: mongoose.Types.ObjectId[];
}

export default async function indexUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const collections = await Collection.find().populate("cards");
        return res.status(200).json(collections);
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
        const { name, cards }: { name: string; cards: string[] } = body;

        const newCollection = new Collection({
          name,
          cards: cards.map((cardId) => new mongoose.Types.ObjectId(cardId)),
        });

        const collectionSaved: TCollection = await newCollection.save();

        return res.status(200).json(collectionSaved);
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
