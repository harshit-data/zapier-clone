import express, { json } from "express"
import userRouter from "./Routers/user"
import zapRouter from "./Routers/zap"
import actionRouter from "./Routers/action"
import triggerRouter from "./Routers/trigger"
import Cors from "cors" 
const port = 3000;
const app = express()

app.use(Cors())
app.use(json())
app.use("/api/v1/user",userRouter);
app.use("/api/v1/zap",zapRouter)
app.use("/api/v1/trigger",triggerRouter)
app.use("/api/v1/action",actionRouter)

app.listen(port,()=>{
    console.log("listening to port ",port)
})