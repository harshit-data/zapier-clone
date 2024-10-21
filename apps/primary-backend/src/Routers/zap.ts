import { Router } from "express"
import { authMiddleware } from "../middleware"
import { PrismaClient, Zap } from "@prisma/client"
import { folderCreateSchema, zapCreateSchema } from "../types"
const client = new PrismaClient()
const router = Router()



router.post("/:folderId", authMiddleware, async (req, res) => {
    const body = req.body;
    const folderId = req.params.folderId
    const parsedData = zapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "incorrect data"
        })
    }
    try {
        const folder = await client.folder.findUnique({
            where: { id: folderId }
        });
        if (!folder) {
            console.log()
            return res.status(404).json({ message: "Folder not found" });
        }
        let data:any = {
            folderId:folderId
        }
        if(parsedData.data.availableTriggerId !== ""){
            data.trigger = {
                create:{
                    availableTriggerId:parsedData.data.availableTriggerId
                }
            }
        }
        if(parsedData.data.actions){
            data.actions = parsedData.data.actions.map((action)=>({availableActionId:action.availableActionId,metaData:action.metaData,sortingOrder:action.sortingOrder})).sort((a, b) => a.sortingOrder - b.sortingOrder);
        }
        data.folder = {
            create:{
                folderId:folderId
            }
        }
        const draftzap = await client.draftZap.create({
            data:data
        })
        console.log(draftzap);
        res.json({
            message:"draftzap created successfully",
            draftzap
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).json({
            message: "something went wrong"
        })
    }
})

router.delete("/:zapId",authMiddleware, async (req,res) => {
    const zapId = req.params.zapId;
    try{
        const exisitingZap = await client.zap.findFirst({
            where:{
                id:zapId
            }
        })
        if(!exisitingZap){
            return res.status(403).json({
                message:"zap doesn't exist with this id"
            })
        }
        await client.zap.delete({
            where:{
                id:zapId
            }
        })
        res.json({
            message:"zap deleted successfully"
        })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message:"there is something wrong with zap deletion"
        })
    }
})  
router.post("/update/:zapId", authMiddleware, async (req, res) => {
    const body = req.body;
    const zapId = req.params.zapId
    console.log(body)
    const parsedData = zapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "incorrect data"
        })
    }
    try {
        console.log(parsedData.data)
        const existingZap = await client.zap.findUnique({
            where:{
                id:zapId
            }
        })
        if(!existingZap){
            res.status(403).json({
                message:"zap doesn't exist with this id"
            })
        }
        res.json({
            message:"zap published successfully",
        })
    }
    catch (e) {
        console.log(e)
        res.status(400).json({
            message: "something went wrong"
        })
    }
})

// create a auth middleware to check whether the user has already signed in or not then redirect the user acordingly


router.get("/get/default-folder",authMiddleware,async (req,res)=>{
    const id  = req.id;
    try {
        const folder = await client.folder.findFirst({
            where:{
                userId:id,
                name:"Default Folder",
            }
        })
        res.send({ 
            folder
        })
    }
    catch(e){
        res.status(400).json(
            {
                message:"something went wrong"
            }
        )
    }
})
router.get("/get-folder", authMiddleware, async (req, res) => {
    const id = req.id;
    try {
        const folder = await client.folder.findMany({
            where: {
                userId: id
            },
            include: {
                draftZaps: {
                    select: {
                        actions: {
                            include: {
                                type: true
                            }
                        },
                        trigger: {
                            include: {
                                type: true
                            }
                        }
                    }
                }

            }
        })
        res.json({
            folder
        })
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        })
    }
})
router.get("/folder/:folderId", authMiddleware, async (req, res) => {
    const id = req.id;
    const folderId = req.params.folderId;
    try {
        const zaps = await client.draftZap.findMany({
            where: {
                folderId: folderId,
                folder:{
                    userId:id
                }
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        })
        res.json({
            zaps
        })
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        })
    }
})


router.get("/:zapId", authMiddleware, async (req, res) => {
    const id = req.id;
    const zapId = req.params.zapId;
    try {
        const zap = await client.draftZap.findFirst({
            where: {
                id: zapId
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                },
            }
        })
        res.json({
            zap
        })
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        })
    }
})
router.post("/create/zaps-folder", authMiddleware, async (req, res) => {
    const body = req.body;
    const parsedData = folderCreateSchema.safeParse(body);
    console.log(body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "incorrect inputs"
        })
    }
    try {

        const existingFolder = await client.folder.findFirst({
            where: {
                userId: req.id,
                name: parsedData.data.name
            }
        })
        if (existingFolder) {
            return res.status(403).json({
                message: "folder name already exist, write a different name"
            })
        }
        console.log(typeof (req.id))
        await client.folder.create({
            data: {
                userId: req.id,
                name: parsedData.data.name
            }
        })
        res.json({
            message: "folder created successfully"
        })
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({
            message: "something went wrong"
        })
    }

})
export default router;