import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Folder } from "@/types";
import {Folder as FolderIcon} from "lucide-react"
import { Menu } from "./menu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedFolderAtom } from "@/atoms/atoms";

export const ShowFolders = ()=>{
    const [folders,setFolders] = useState<[]>([]);
    const setSelectedFolder = useSetRecoilState(selectedFolderAtom)
    const selectedFolder = useRecoilValue(selectedFolderAtom)

    const handleFolderChange = (id:string,name:string)=>{
        console.log(name)
        setSelectedFolder({id,name})
    }
    const getFolders = async ()=>{
        const token = localStorage.getItem("token")
        try{
            const res = await axios.get(`${BACKEND_URL}/api/v1/zap/get-folder`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            // console.log(res.data.data);
            setFolders(res.data.folder)
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getFolders();

    },[])
    console.log(selectedFolder)
    return (
        <div>
            {
                folders.map((f:Folder)=>{
                    return (
                        <div onClick={()=>handleFolderChange(f.id,f.name)} className="cursor-pointer flex items-center justify-between px-5 py-2 hover:bg-[#f7f6fd] hover:text-[#503EBD] hover:underline">
                            <div className="flex items-center gap-3">
                                <FolderIcon />
                                <div  className="text-xl">{f.name}</div>
                            </div>
                            <Menu type="hor" index={0} options={[{
                                name:"Rename",
                                onCLick:()=>{}
                            },{
                                name:"Delete",
                                onCLick:()=>{}
                            }]}/>
                        </div>
                    );
                })
            }
        </div>
    );
}