import { Router } from "express";
import AuthMiddleWare, { DecodeFunction } from "../middleware/middleware";
import {  Request , Response } from "express";
import { StatusCode, TodoBody } from "../types/tstypes";
import { getAllTask } from "../db";
import { createTodo } from "../validations/uservalidation";

const todoRoutes = Router();


todoRoutes.get('/',AuthMiddleWare,async (req:Request,res:Response)=>{
   const body = DecodeFunction(req);
   if(!body ){
        return res.status(StatusCode.InputNotGiven).json({
            msg : 'Input Not Given !'
        })
   }
   const id = body.id;
   if(!id){
    return res.json({
        msg : 'The Input is Not Given'
    })
   }
   try {
        const todos  = await getAllTask(id);
        return res.json({
        msg : todos
        })
   } catch (error) {
        return res.status(StatusCode.InternalServer).json({
            msg : 'Something Wrong is Happened !'
        })
   }    

})

todoRoutes.post('/posttodo',AuthMiddleWare,async (req:Request,res:Response)=>{
    const todoBody : TodoBody = req.body;
    const parseBody = createTodo.safeParse(todoBody);
    if(!parseBody.success){
        return res.status(StatusCode.LackInput).json({
            msg : 'Check Your Input'
        })
    }
    try {
        const todo = await 
    } catch (error) {
        
    }

})


export default todoRoutes;