import { defaultFolderAtom, selectedActionsAtom, selectedFolderAtom, selectedTriggerAtom } from "@/atoms/atoms";
import { ZapActionsModel } from "@/components/zaps/zap-action-model";
import { ZapTriggerModel } from "@/components/zaps/zap-trigger-model";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

export const CreateZaps = () => {
    const params = useParams()
    const selectedFolderId = params.folderId
    const navigate = useNavigate();
    const [selectedActions, setSelectedActions] = useRecoilState(selectedActionsAtom)
    // function for adding a action to the selected actions
    console.log(selectedFolderId)
    
    const selectedTrigger = useRecoilValue(selectedTriggerAtom)
    const addAction = (index:number)=>{
        setSelectedActions([...selectedActions.slice(0,index),
            {
                availableActionId:"",
                sortingOrder:index,
                actionMetaData:"",
                name:"",
                image:"",
                actionEvents:[]
        },...selectedActions.slice(index)])
    }
    const createZap  = async ()=>{
        const token = localStorage.getItem("token");
        try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/zap/${selectedFolderId}`,{
                availableTriggerId:selectedTrigger?.availableTriggerId,
                triggerMetaData:selectedTrigger?.triggerMetaData,
                actions:selectedActions
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })  
            console.log(res);
            navigate(`/editor/${res.data.draftzap.id}/draft`)
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        if(selectedTrigger || selectedActions.length > 0){
            createZap();
        }
        
    },[selectedTrigger,selectedActions])
    return (
        <div className="flex flex-col items-center justify-center mt-[300px]">
            <div className="flex flex-col ">
            <ZapTriggerModel  />
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className="h-[30px] w-1 bg-[#7A6CD6]"></div>
                <Plus onClick={()=>addAction(0)} className="hover:bg-[#7A6CD6] w-8 h-8 hover:text-white rounded-full transition-all duration-300 cursor-pointer"/>
            </div> 
            </div>
            {
                selectedActions.map((action, index) => {
                    return (
                        <div className="flex flex-col items-center">
                            <div className="h-[30px] w-1 bg-[#7A6CD6]"></div>
                            <ZapActionsModel index={index} />
                            <div className="flex flex-col items-center justify-center">
                                <div className="h-[30px] w-1 bg-[#7A6CD6]"></div>
                                <Plus onClick={()=>addAction(index+1)} className="hover:bg-[#7A6CD6] w-8 h-8 hover:text-white rounded-full transition-all duration-300 cursor-pointer" />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}