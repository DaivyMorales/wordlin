import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/db";
import Collection from "../../../models/collection.model";
import Card from "../../../models/collection.model";
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
        const collections = await Collection.find();

        
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
        const {
          name,
          Card,
          User,
        }: { name: string; Card: string[]; User: string } = body;

        const newCollection = new Collection({
          name,
          Card: Card.map((cardId) => new mongoose.Types.ObjectId(cardId)),
          User,
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


