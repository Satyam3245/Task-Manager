import { Router } from "express";
import AuthMiddleWare, { DecodeFunction } from "../middleware/middleware";
import {  Request , Response } from "express";
import { StatusCode, TodoBody } from "../types/tstypes";
import { createTask, getAllTask } from "../db";
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
    const body = DecodeFunction(req);
    if(!body || !body.id || !body.email){
        return res.status(StatusCode.Unauthorized).json({
            msg : 'Please send the correct token ..'
        })
    }
    const parseBody = createTodo.safeParse(todoBody);
    if(!parseBody.success){
        return res.status(StatusCode.LackInput).json({
            msg : 'Check Your Input'
        })
    }
    try {
        const todo = await createTask(body.id,todoBody.task);
        return res.status(StatusCode.Successful).json({
            msg : 'Successfully Made !'
        })
    } catch (error) {
        return res.status(StatusCode.InternalServer).json({
            msg : 'Error Occurred !'
        })
    }

})


export default todoRoutes;