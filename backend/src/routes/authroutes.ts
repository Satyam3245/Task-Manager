import { Router , Request , Response } from "express";
import { LoginBody, SignInBody, StatusCode, StatusResponse } from "../types/tstypes";
import bcrypt from 'bcrypt';
import { createUser, findUser, findUserByEmail } from "../db";
import jwt from 'jsonwebtoken';
import { createSignin , createLogin } from "../validations/uservalidation";
const saltRound = 10;

const authRoute = Router();



authRoute.post('/signup',async (req:Request,res:Response<StatusResponse>)=>{
    const userBody : SignInBody = req.body 
    const parseBody = createSignin.safeParse(userBody);
    if(!parseBody.success){
        return res.status(StatusCode.InputNotGiven).json({
            msg:'Verify Your Input !'
        })
    } 
    try {
        const existingUser = await findUserByEmail(userBody.email)
        if(existingUser){
            return res.status(StatusCode.UserExist).json({
                msg : 'User already Exist !'
            })
        }
        const hashPassword = await bcrypt.hash(userBody.password,saltRound);
        const hashedUser: SignInBody = {email : userBody.email,name:userBody.name , password:hashPassword}  
        const user = await createUser(hashedUser);
        if(user.error){
            return res.status(StatusCode.InputNotGiven).json({ msg: user.error });
        }
        const token = jwt.sign(user,process.env.JWT_SECRET as string);  
        return res.status(StatusCode.Successful).json({
            msg:token
        })
    } catch (error) {
        return res.status(500).json({
            msg : 'Something is Wrong with our Data Base ! '
        })
    }

    
})


authRoute.post('/login',async (req:Request,res:Response<StatusResponse>)=>{
    const userBody : LoginBody = req.body;
    const parseBody = createLogin.safeParse(userBody);
    if(!parseBody.success){
        return res.status(StatusCode.InputNotGiven).json({
            msg:'Verify Your Input !'
        })
    } 
    try {
        const user = await findUser(parseBody.data.email,parseBody.data.password);
        if (user == null){
            return res.json({
                msg:'Credentials are not Match ! or Something Happened to our Database'
            })
        }else {
            const token = jwt.sign(user,process.env.JWT_SECRET as string)
            return res.json({
                msg:token
            })
        }
    } catch (error) {
        return res.status(StatusCode.InternalServer).json({
            msg : "Something is Wrong with your email and password"
        })
    }
})





export default authRoute;