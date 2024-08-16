import express from "express"
import { Prisma, PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient()

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId
    const zapId = req.params.zapId
    const body = req.body;
    //  store in db a new triger
    await client.$transaction(
        async (tx) => {
            const run = await client.zapRun.create({
                data: {
                    ZapId: zapId,
                    metaData:body
                }
            })
            await client.zapRunOutbox.create({
                data: {
                    zapRunId: run.id   
                }
            })
        }
    )
    
    res.send("process success")
    
    // push it onto a queue kafka / reddis

})

app.listen(3001, () => {
    console.log("listening to port 3001")
})