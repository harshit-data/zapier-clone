import express from "express"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient();
const app = express()
const port = 3001

app.post("/hooks/catch/:userId/:zapId",async (req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;

    const body = req.body
    console.log(typeof(body))
    // check for the password sent with the request

    // store in db a new trigger

    try {
        await client.$transaction(async (tx) => {
            const run = await tx.zapRun.create({
                data: {
                    zapId,
                    metaData:{}
                }
            });
            console.log(run);
            await tx.zapRunOutbox.create({
                data: {
                    zapRunId: run.id
                }
            });
        });
        res.send("hello");
    } catch (error) {
        console.error("Transaction failed: ", error);
        res.status(500).send("Internal Server Error");
    }
    
})
app.listen(port,()=>{
    console.log("listening to port ",port)
})