import { Router } from "express"
import { authMiddleware } from "../middleware"
import { SigninSchema, SignupSchema } from "../types";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { JWT_SECRET } from "../config";
const router = Router()
const client = new PrismaClient()
router.post("/signup", async (req, res) => {
    const body = req.body;
    console.log(req.body)
    const parsedData = SignupSchema.safeParse(body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "incorrect data"
        })
    }
    const existingUser = await client.user.findFirst({
        where: {
            username: parsedData.data.username
        }
    })
    if (existingUser) {
        return res.status(403).json({
            message: "user already exist"
        })
    }
    // await bcrypt.genSalt(10);
    const hashedPasssord = await bcrypt.hash(parsedData.data.password,10)
    try {
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                email: parsedData.data.email,
                password: hashedPasssord
            }
        })
        await client.folder.create({
            data:{
                userId:user.id,
                name:"Default Folder",
            }
        })
        // await sendEmail for verification of email
        const token = jwt.sign({ email: parsedData.data.email,id:user.id }, JWT_SECRET)
        return res.json({
            message: "user created successfully",
            token: token
        })
    }
    catch (e) {
        return res.status(400).json({
            message: "something went wrong"
        })
    }


})
// create a auth middleware to check whether the user has already signed in or not then redirect the user acordingly

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "incorrect data"
        })
    }
    // verifying the password
    const existingUser = await client.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    })
    if (!existingUser) {
        return res.status(403).json({
            message: "user doesn't exist, you have to signup first"
        })
    }
    try {
        console.log(existingUser.password,parsedData.data.password)
        const compare = await bcrypt.compare(parsedData.data.password,existingUser.password);
        console.log(compare)
        if (!compare) {
            return res.status(401).json({
                message: "incorrect password"
            })
        }
        const token = jwt.sign({ email: parsedData.data.email,id:existingUser.id }, JWT_SECRET)
        return res.json({
            message: "user signed in successfully",
            token: token
        })
    }
    catch (e) {
        return res.status(400).json({
            message: "something went wrong"
        })
    }

})
router.post("/verify-token",authMiddleware,(req,res)=>{
    res.json({
        message:"you are logged in"
    })
})
router.get("/", async (req, res) => {
    // @ts-ignore
    const id = req.id;
    try {
        const user = await client.user.findFirst({
            where: {
                id
            },
            select: {
                username:true,
                email:true
            }
        })
        res.json({
            user
        })
    }
    catch (e) {
        return res.status(400).json({
            message: "something went wrong"
        })
    }
})
export default router;