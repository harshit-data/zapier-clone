import { BACKEND_URL, HOOKS_URL } from "../../config";
import { format } from "date-fns"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { zapsAtom } from "@/atoms/atoms";
import { useNavigate } from "react-router-dom";

export function ZapTable() {
    const navigate = useNavigate()
    const [zaps,setZaps] = useRecoilState(zapsAtom)
    const [open,setOpen] = useState(false)
    const handleOpenZapInEditor = (id:String)=>{
        navigate(`/editor/${id}/draft`)
    }
    const handleDeleteZap = async(id:string,index:number)=>{
        const token = localStorage.getItem("token")
        try {
            const res = await axios.delete(`${BACKEND_URL}/api/v1/zap/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setZaps([...zaps.slice(0,index),...zaps.slice(index+1)])
            toast("zap deletion successfull", {
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
        catch(e){
            console.log(e)
            toast("some problem pccured while deleting the zap", {
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
        setOpen(false)
    }
    return <div className="w-full">
        <div className="grid grid-cols-4 text-center mb-4">
            <div className="">Name</div>
            <div className="">Created at</div>
            <div className="">Webhook URL</div>
            <div className="">Go</div>
        </div>
        {zaps.length > 0 && zaps.map((z, index) => {
            return <div className="grid grid-cols-4 text-center">
                <div className="flex ">
                    {
                        z.status === "pending" && <div>Untitled Zap</div>
                    }
                    {/* <img src={z..type.image} className="w-[30px] h-[30px]" />  */}
                    {/* {
            z?.actions?.map(x => <img src={x.type.image} className="w-[30px] h-[30px]" />)} */}
                </div>
                <div className="">{format(new Date(z.createdAt), "yyyy-MM-dd")}</div>
                <div className="">{`${HOOKS_URL}/hooks/catch/1/${z?.id}`}</div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="text-xl font-bold cursor-pointer">&gt;</SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                {
                                    z.status === "pending" ? "Untitled Zap" : "Zap"
                                }
                            </SheetTitle>
                            <SheetDescription className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div>
                                        Created AT
                                    </div>
                                    <div>
                                        {format(new Date(z.createdAt), "yyyy-MM-dd")}
                                    </div>
                                </div>
                                <Button onClick={()=>handleOpenZapInEditor(z.id)} variant="action">
                                    View In Editor
                                </Button>
                                <Button onClick={()=>handleDeleteZap(z.id,index)} variant="delete" className="w-1/2 mx-auto rounded-none flex gap-2">
                                    <Trash/>Delete Zap
                                </Button>
                            </SheetDescription>

                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        })}
    </div>
}