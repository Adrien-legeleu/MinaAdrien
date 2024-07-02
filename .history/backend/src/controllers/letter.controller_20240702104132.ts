import { type Response } from "express";
import { LetterModel } from "../model/letter.model";

export class LetterController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const letter = await LetterModel.find(groupId);
      res.status(200).send(letter);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async findOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const { letterId } = req.params;
      const letter = await LetterModel.findOne({ groupId, _id: letterId });
      if (!letter) {
        res.status(404).send({
          error: "letter not found" + letterId,
        });
        return;
      }
      res.status(200).send(letter);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async create(req: any, res: Response): Promise<void> {
    try {
      const { groupId, title, text, url_images, isLiked } = req.body;

      if (!groupId || !title || !text || !url_images || !isLiked) {
        res.status(404).send({
          error:
            "properties not found (groupdId or title or text or url_images or isLiked)",
        });
        return;
      }

      const letter = await LetterModel.create({
        groupId,
        title,
        text,
        url_images,
        isLiked,
      });

      res.status(200).send(letter);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async updateOneById(req: any, res: Response): Promise<void> {
    try {
      const { groupId, title, text, url_images, isLiked } = req.body;
      const { letterId } = req.params;

      if (!letterId) {
        res.status(404).send({
          error: "letter  not found" + letterId,
        });
        return;
      }
      if (!groupId || !title || !text || !url_images || !isLiked) {
        res.status(404).send({
          error:
            "properties not found (groupdId or title or text or url_images or isLiked)",
        });
        return;
      }
      const letter = await LetterModel.findOneAndUpdate(
        {
          groupId,
          _id: letterId,
        },
        {
          ...(title ? { title } : {}),
          ...(text ? { text } : {}),
          ...(url_images ? { url_images } : {}),
          ...(isLiked ? { isLiked } : {}),
        }
      );

      if (!letter) {
        res.status(404).send({
          error: "letter not found" + letterId,
        });
        return;
      }
      res.status(200).send(letter);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
  async delete(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const letter = await LetterModel.find(groupId);
      res.status(200).send(letter);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
