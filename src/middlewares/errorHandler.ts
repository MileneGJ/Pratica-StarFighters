import { Request,Response,NextFunction } from "express";

export default function errorHandler (
    error:any,req:Request,res:Response,next:NextFunction){
        switch (error.code) {
            case 'Invalid Body':
                return res.status(422).send(error.message);
            case 'NotGitHubUser':
                return res.status(404).send(error.message);        
            default:
                return res.status(500).send('Server error');
        }
    }