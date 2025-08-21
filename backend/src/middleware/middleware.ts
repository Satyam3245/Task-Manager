import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../types/tstypes';
import jwt from 'jsonwebtoken';
// import { any } from 'zod';
interface AuthenticateUser extends Request {
    user? : any
}

interface decodetoken {
    email?: string,
    id?: string,
    iat?: number
}

const AuthMiddleWare = (req:AuthenticateUser,res:Response,next:NextFunction)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader || typeof authHeader !== "string"){
        return res.redirect('/auth/login')
    }
    if(!authHeader.startsWith('Bearer ')){
        return res.redirect('/auth/login')
    }
    let token = authHeader.split(" ")[1];
    try {
            const decoded = jwt.verify(token , process.env.JWT_SECRET as string)
            req.user = decoded;
            next()
        } catch (error) {
            res.status(StatusCode.LackInput).json({
                msg : 'Invalid token.' 
            })
        }
}

export const DecodeFunction = (req : AuthenticateUser )=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return null;
    }
    const token = authHeader.split(" ")[1];
    if(!authHeader){
        return null;
    }
    try {
        const decodedToken = jwt.decode(token) as decodetoken
        if(!decodedToken || !decodedToken.id || decodedToken.email){
            return null
        }
        return decodedToken
    } catch (error) {
        return null;
    }
}


export default AuthMiddleWare;