import { type Response } from "express";

export class LetterController {
  async findAll(req: any, res: Response): Promise<void> {
    try {
    } catch (error) {
      console.log(error:any);
      res.status(500).send({
        error: error?.message,
      });
    }
  }
}
