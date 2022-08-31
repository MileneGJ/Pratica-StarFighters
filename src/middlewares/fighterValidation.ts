import fighterSchema from "../schemas/fighterSchema";
import { Request, Response,NextFunction } from "express";

export default function fighterValidation (req:Request,res:Response,next:NextFunction){
    const validation = fighterSchema.validate(req.body)
    if(validation.error){
        throw {code:'Invalid Body', message:validation.error.details[0].message}
    } else {
        next()
    }
}