import {email, z} from "zod"

export const createSignin = z.object({
    name : z.string(),
    email : z.string(),
    password : z.string().min(8)
})

export const createLogin = z.object({
    email : z.string(),
    password : z.string()
})