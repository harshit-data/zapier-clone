import {selectedActionsAtom } from "@/atoms/atoms";
import { BACKEND_URL } from "@/config";
import { AvailableAction } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { ActionZapCell } from "./action-zap-cell";


type Props = {
    index:number
}
export const ZapActionsModel = ({index}:Props) => {

    const [selectedActions,setSelectedActions] = useRecoilState(selectedActionsAtom)

    const [availableActions, setAvailableActions] = useState<[] | AvailableAction[]>([])


    // fetching the available Actionss
    const fetchAvailableActions = async () => {
        try {
            const res = await axios(`${BACKEND_URL}/api/v1/action/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setAvailableActions(res.data.data)
        }
        catch (e) {
            console.log("problem while fetching the available Actionss", e)
        }
    }
    useEffect(() => {
        fetchAvailableActions()
    }, [])

    // function for handling the selection of action

    const handleActionSelection = (action:AvailableAction)=>{
        setSelectedActions([...selectedActions.slice(0,index),{
            availableActionId:action.id,
            name:action.name,
            image:action.image,
            actionMetaData:"",
            sortingOrder:index,
            actionEvents:action.actionEvents
        },...selectedActions.slice(index+1)])
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <ActionZapCell actionType={selectedActions[index]}/>
                </DialogTrigger>
                <DialogContent className="w-[500px]">
                    <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#7A6CD6] ">Select Action</DialogTitle>
                        <DialogDescription className="flex flex-col gap-2">
                            {
                                availableActions.map((action)=>{
                                    return (
                                        <div onClick={()=>handleActionSelection(action)} className="flex h-[56px]  items-center gap-5 px-4 py-2 cursor-pointer shadow-lg text-[#7A6CD6] hover:bg-[#7A6CD6] hover:text-white rounded-lg">
                                            <img src={action.image} alt="jpg" className="w-10" />
                                            <div className="text-lg">
                                                {action.name}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}