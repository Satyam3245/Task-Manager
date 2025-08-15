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
                password : password
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