import { selectedActionsAtom, selectedTriggerAtom } from "@/atoms/atoms";
import { BACKEND_URL } from "@/config";
import { AvailableTrigger, TriggerEvent } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";



import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TriggerZapCell } from "./trigger-zap-cell";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Pencil } from "lucide-react";
import { WebhookSetupPage } from "../setupPages/webhookSetupPage";
import { WebhookTestingPage } from "../testingPages/webhookTestingPage";


export const ZapTriggerModel = () => {


    const [selectedTrigger, setSelectedTrigger] = useRecoilState(selectedTriggerAtom)
    const [availableTriggers, setAvailableTrigers] = useState<[] | AvailableTrigger[]>([])
    const [openSelectTrigger, setOpenSelectTrigger] = useState(false)
    const [openSetupTrigger, setOpenSetupTrigger] = useState(false)
    const [isSelectingTrigger, setIsSelectingTrigger] = useState(false)
    const [triggerAction, setTriggerAction] = useState<null | TriggerEvent>(null)
    const [isTesting, setIsTesting] = useState(false)
    // fetching the available triggers
    const fetchAvailableTriggers = async () => {
        try {
            const res = await axios(`${BACKEND_URL}/api/v1/trigger`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setAvailableTrigers(res.data.data)
            console.log(res)
        }
        catch (e) {
            console.log("problem while fetching the available triggers", e)
        }
    }

    // handling the selection of trigger
    const handleTriggerSelection = (trigger: AvailableTrigger) => {

        setSelectedTrigger({
            availableTriggerId: trigger.id,
            name: trigger.name,
            triggerMetaData: "",
            image: trigger.image,
            triggerEvents: trigger.triggerEvents
        })
        setOpenSelectTrigger(false)
        setOpenSetupTrigger(true)
        setIsSelectingTrigger(false)
    }
    
    // handling the change of the trigger


    useEffect(() => {
    
        fetchAvailableTriggers()
    }, [])
    return (
        <div>

            {selectedTrigger && !isSelectingTrigger ?
                <Sheet open={openSetupTrigger} onOpenChange={setOpenSetupTrigger}>
                    <SheetTrigger><TriggerZapCell triggerType={selectedTrigger} /></SheetTrigger>
                    <SheetContent className=" h-[700px] mt-[50px]">
                        <SheetHeader>
                            <SheetTitle className="flex flex-col gap-4" >
                                <div className="flex items-center gap-1">
                                <img className="w-10" src={selectedTrigger.image} alt="jpg" />
                                <div>
                                    {
                                        triggerAction ? triggerAction.name : "Select the Event"
                                    }
                                </div>
                                <Pencil />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className=" cursor-pointer font-bold text-lg hover:text-[#5140bf]" onClick={() => setIsTesting(false)}>Setup</div>
                                    <div> &gt;</div>
                                    <div className=" cursor-pointer font-bold text-lg hover:text-[#5140bf]"  onClick={() => setIsTesting(true)} >Test</div>
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                                {
                                    !isTesting ? <WebhookSetupPage setTriggerAction={setTriggerAction} selectedTrigger={selectedTrigger} setOpenSelectTrigger={setOpenSelectTrigger}
                                        setIsSelectingTrigger={setIsSelectingTrigger} /> : <WebhookTestingPage selectedTrigger={selectedTrigger} />
                                }
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                :
                <Dialog open={openSelectTrigger} onOpenChange={setOpenSelectTrigger}>
                    <DialogTrigger>
                        <TriggerZapCell triggerType={selectedTrigger} />
                    </DialogTrigger>
                    <DialogContent className="w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#7A6CD6] ">Select Trigger</DialogTitle>
                            <DialogDescription className="flex flex-col gap-2">
                                {
                                    availableTriggers.map((trigger) => {
                                        return (
                                            <div onClick={() => handleTriggerSelection(trigger)} className="flex h-[56px]  items-center gap-5 px-4 py-2 cursor-pointer shadow-lg text-[#7A6CD6] hover:bg-[#7A6CD6] hover:text-white rounded-lg">
                                                <img src={trigger.image} alt="jpg" className="w-10" />
                                                <div className="text-lg">
                                                    {trigger.name}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
}
