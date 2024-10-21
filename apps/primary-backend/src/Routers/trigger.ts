import { PrismaClient } from "@prisma/client";
import {Router} from "express"
import { authMiddleware } from "../middleware";
const router = Router()

const client = new PrismaClient()
router.get("/", authMiddleware, async (req, res) => {
    const id = req.id;
    try {
        const data = await client.availableTrigger.findMany({
            where:{},
            include:{
                triggerEvents:true
            }
        })
        res.json({
            data
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).json({
            message: "something went wrong"
        })
    }
})

export default router;

