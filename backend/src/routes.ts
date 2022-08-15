import { Router } from "express";
import { AddFilms } from "./controllers/AddFilms";
import { ListMovies } from "./controllers/ListMovies";

const router = Router();

router.get("/", new ListMovies().handle);
router.post("/", new AddFilms().handle);

export { router };
