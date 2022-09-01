import { Request, Response } from "express";
import { getRanking, getStarCount } from "../services/fighterServices.js";

export async function compareStars (req: Request,res: Response) {
const result = await getStarCount(req.body.firstUser,req.body.secondUser)
res.status(200).send(result)
}

export async function getFighters (req: Request,res: Response) {
const result = await getRanking()
res.status(200).send(result)
}