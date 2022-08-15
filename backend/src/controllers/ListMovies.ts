import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class ListMovies {
  async handle(req: Request, res: Response) {
    const { page } = req.query;

    try {
      const movies = await prismaClient.movie.findMany({
        skip: parseInt((page as string) ?? 0) * 10,
        take: 10,
      });
      return res
        .status(200)
        .json({ page: parseInt(page as string) ?? 0, size: 10, movies });
    } catch (err) {
      return res.status(500).json(err);
    } finally {
      prismaClient.$disconnect();
    }
  }
}
