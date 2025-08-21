import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { User , CreateUserResult } from "../types/tstypes";

const prisma = new PrismaClient();
export async function createUser(userInfo : User): Promise<CreateUserResult>{
    try {
        const user = await prisma.user.create({
            data:{
                name:userInfo.name,
                email:userInfo.email,
                password:userInfo.password
            }
        })
        return {data : {email:user.email,id:user.id}}
    } catch (error:any) {
        return {error : error.message|| 'Failed to Create a user !'}
    }finally{
        await prisma.$disconnect();
    }
}

export async function findUser(email :string,password:string){
    try {
        const user = await prisma.user.findFirst({
            where:{
                email: email,
            }
        });
        if (user && await bcrypt.compare(password,user.password)){
            return {email:user.email,id:user.id}
        }
        return null
    } catch (error) {
        console.log('Error Finding ')
    }
}

export async function findUserByEmail(email : string){
    try {
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user){
            return null
        }else{
            return user
        }
    } catch (error) {
        console.log(error)
    }
}


export async function getAllTask(id :string){
    try {
        const todo = await prisma.todos.findMany({
            where:{
                userId : id
            }
        });

        return todo.length > 0 ? todo : null;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}


export async function createTask(id : string , task : string){
    try {
        const todo = await prisma.todos.create({
            data:{
                userId : id,
                task : task
            }
        });
        return todo;
    } catch (error) {
        throw error
    }
}
