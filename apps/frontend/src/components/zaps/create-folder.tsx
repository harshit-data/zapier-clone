
import { Button } from "../ui/button"
import FormField from "@/formFields/folderFormField";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { folderCreateSchema } from "@/schema";
import { FolderFormData } from "@/types";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export const CreateFolder = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FolderFormData>({
        resolver: zodResolver(folderCreateSchema)
    })

    const [open,setOpen] = useState(false);

    const onSubmit: SubmitHandler<FolderFormData> = async (data) => {
        console.log("submiting")
        const token = localStorage.getItem("token")
        try {
            await axios.post(`${BACKEND_URL}/api/v1/zap/create/zaps-folder`, {
                name: data.name
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            toast("folder created successfully", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.status === 403) {
                    toast("folder name alredy exist, try with another name", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            }
        }
        setOpen(false)
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger><Button className="h-[60px] text-4xl border-[1px] text-[#574e4c] bg-white hover:bg-[#f9f7f3]">+</Button></DialogTrigger>
                <DialogContent className="w-[800px] h-[200px]">
                    <DialogHeader>
                        <DialogTitle className="text-center text-3xl font-semibold mb-4">Add new personal folder</DialogTitle>
                        <DialogDescription className="flex justify-center items-center gap-4">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
                                <FormField
                                    type="name"
                                    placeholder="Name of Folder"
                                    name="name"
                                    register={register}
                                    error={errors.name}
                                />
                                <Button type="submit" variant="action"> Create</Button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="closing">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}