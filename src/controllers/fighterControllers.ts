import { Request, Response } from "express";
import { getRanking, getStarCount } from "../services/fighterServices";

export async function compareStars (req: Request,res: Response) {
const result = getStarCount(req.body.firstUser,req.body.secondUser)
res.status(200).send(result)
}

export async function getFighters (req: Request,res: Response) {
const result = getRanking()
res.status(200).send(result)
}