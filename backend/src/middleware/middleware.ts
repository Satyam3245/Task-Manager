import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../types/tstypes';
import jwt from 'jsonwebtoken';
// import { any } from 'zod';
interface AuthenticateUser extends Request {
    user? : any
}
const AuthMiddleWare = (req:AuthenticateUser,res:Response,next:NextFunction): any =>{
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


export default AuthMiddleWare;