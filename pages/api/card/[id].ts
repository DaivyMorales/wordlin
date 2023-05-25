import Card from "@/models/card.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function idCard(
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
        const cardFound = await Card.findById(id);

        if (!cardFound) return res.status(404).json("That card doesn't exist");

        return res.status(200).json(cardFound);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "PUT":
      try {
        const card = await Card.findByIdAndUpdate(id, body, { new: true });

        if (!card) return res.status(404).json("That card doesn't exist");

        return res.status(200).json(card);
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    case "DELETE":
      try {
        const deletedCard = await Card.findByIdAndRemove(id);

        if (!deletedCard)
          return res.status(404).json("That card doesn't exist");

        return res.status(200).json("Card has been deleted correctly");
      } catch (error) {
        res.status(500).json({ error });
      }

      break;

    default:
      break;
  }
}
