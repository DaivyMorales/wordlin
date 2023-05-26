import { NextApiRequest, NextApiResponse } from "next";
import Collection from "../../../models/collection.model";

export default async function idCollection(
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
        const collectionFound = await Collection.findById(id);
        if (!collectionFound)
          return res.status(404).json("Collection hasn't been found");
        res.status(200).json(collectionFound);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
      break;

    case "PUT":
      try {
        const collectionUpdate = await Collection.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!collectionUpdate)
          return res.status(404).json("Collection hasn't been found");

        res.status(200).json(collectionUpdate);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
      break;

    case "DELETE":
      try {
        const collectionDeleted = await Collection.findByIdAndRemove(id);

        if (!collectionDeleted)
          return res.status(404).json("Collection hasn't been found");

        res.status(200).json(collectionDeleted);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
      break;

    default:
      res.status(400).json("Invalid method!");

      break;
  }
}
