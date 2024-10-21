
import { useRecoilState } from "recoil";
import { CreateFolder } from "./create-folder";
import { ShowFolders } from "./show-folders";
import {defaultFolderAtom, selectedFolderAtom, zapsAtom} from "../../atoms/atoms"
import { ZapTable } from "./zaps-tables";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import {Loader2, Plus} from "lucide-react"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
export const ShowZaps = ()=>{
    const navigate = useNavigate()
    const [selectedFolder,setSelectedFolder] = useRecoilState(selectedFolderAtom)
    const [zaps,setZaps] = useRecoilState(zapsAtom)
    const [loading,setLoading] = useState(true)
    const [defaultFolder,setDefaultFolder] = useRecoilState(defaultFolderAtom);
    const getZaps = async ()=>{
        setLoading(true)
        const token = localStorage.getItem("token")
        try{
            const res = await axios.get(`${BACKEND_URL}/api/v1/zap/folder/${selectedFolder.id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(res.data.zaps){
                setZaps(res.data.zaps)
            }
        }
        catch(e){
            console.log(e);
        }
        setLoading(false)
    }
    const navigateCreateZap = ()=>{
        navigate(`/zap/create/attempt/${selectedFolder.id}/`)
    }
    const getDefaultFolder = async ()=> {
        const token = localStorage.getItem("token")
        try{
            const res = await axios.get(`${BACKEND_URL}/api/v1/zap/get/default-folder`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(res)
            setDefaultFolder(res.data.folder)
        }
        catch(e){
            console.log("error:-",e)
        }
    }
    useEffect(()=>{
       getDefaultFolder()
    },[])
    useEffect(()=>{
        if(selectedFolder.id === "" && defaultFolder){
            setSelectedFolder({
                id:defaultFolder.id,
                name:defaultFolder.name
            }
            )
        }
    })
    useEffect(()=>{
        getZaps() 
    },[selectedFolder])
    return (
        <div className="flex  gap-10 w-full">
            <div className="flex flex-col gap-6 border-r-2 min-h-[100vh] pr-4">
            <h1 className="text-4xl font-semibold">Zaps</h1>
                <div className="flex gap-4 items-center">
                    <div className="bg-[#f7f6fd] px-5 py-4 min-w-[400px] text-[#503ebd] text-lg">My Zaps</div>
                    <CreateFolder />
                </div>
                <ShowFolders />
            </div>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex justify-between items-center pr-16">
                <h1 className="text-3xl">My Zaps ({selectedFolder.name})</h1>
                <Button onClick={navigateCreateZap} variant={"action"}><Plus />Create</Button>
                </div>
                
                {
                    loading ? <div><Loader2 className="animate-spin"/></div>:
                    zaps && <ZapTable />
                }
                
            </div> 
        </div>
    );
}