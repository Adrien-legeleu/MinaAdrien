import { type Response } from "express";
import { LetterModel } from "../model/letter.model";

export class LetterController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
      const { groupId } = req.body;
      const letter = await LetterModel.find(groupId);
    } catch (error: any) {
      console.log(error);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
