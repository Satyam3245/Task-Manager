import { Router , Request , Response } from "express";
import { StatusCode, StatusResponse } from "../types/tstypes";

const authRoute = Router();



authRoute.post('/signup',(req:Request,res:Response<StatusResponse>)=>{
    const {name , email , password} = req.body 
    
    if ( !name || !email || !password){
        return res.status(StatusCode.InputNotGiven).json({
            msg : 'Input is Not Given !'
        })
    }

})


authRoute.post('/login',(req:Request,res:Response<StatusResponse>)=>{
    const {email , password} = req.body();
    if (!email || !password){
        return res.status(StatusCode.InputNotGiven).json({
            msg : 'Input is Not Given !'
        })
    }
})





export default authRoute;