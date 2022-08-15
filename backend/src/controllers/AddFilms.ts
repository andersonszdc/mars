import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import fetch from "node-fetch";
import { Prisma } from "@prisma/client";

export class AddFilms {
  async handle(req: Request, res: Response) {
    try {
      const response = await fetch("https://ghibliapi.herokuapp.com/films", {
        method: "GET",
      });
      const data = await response.json();

      let dataToCreate: Prisma.MovieCreateManyInput;

      dataToCreate = data.map((film: any) => ({
        title: film.title,
        banner: film.movie_banner,
        description: film.description,
        director: film.director,
        producer: film.producer,
      }));

      const resp = await prismaClient.movie.createMany({
        data: dataToCreate,
      });

      return res.status(200).json(resp);
    } catch (err) {
      return res.status(500).json(err);
    } finally {
      prismaClient.$disconnect();
    }
  }
}
