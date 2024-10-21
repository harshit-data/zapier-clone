import {z}from "zod"

export const SignupSchema= z.object({
    username:z.string().min(5),
    email:z.string().email(),
    password:z.string().min(5)
})
export const SigninSchema= z.object({
    email:z.string(),
    password:z.string()
})
export const zapCreateSchema = z.object({
    availableTriggerId:z.string(),
    triggerMetadata:z.any().optional(),
    actions:z.array(z.object({
        availableActionId:z.string(),
        metaData:z.any().optional()
    }))
})

export const folderCreateSchema = z.object({
    name:z.string()
})

export const webhookSetupSchema = z.object({
    availableTriggerId:z.string(),
    triggerEvent:z.string()
})