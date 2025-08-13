import express, { Request, Response } from "express";
import authRoute from "./routes/authroutes";
const app : express.Application = express();
const Port : 3000 = 3000;


app.use(express.json())
app.use('/auth/',authRoute);

app.listen(Port,():void=>{
    console.log(`The Port is Listing `)
})