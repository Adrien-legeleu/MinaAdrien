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
  async updateOneById(req: any, res: Response): Promise<void> {
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
