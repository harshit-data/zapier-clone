import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import {  SelectedTrigger, TriggerEvent } from "@/types";

type Props = {
    setIsSelectingTrigger:(val:boolean)=>void,
    setOpenSelectTrigger:(val:boolean)=>void,
    selectedTrigger:SelectedTrigger,
    setTriggerAction:(val:TriggerEvent)=>void
}
export const WebhookSetupPage = ({selectedTrigger,setTriggerAction,setOpenSelectTrigger,setIsSelectingTrigger}:Props) => {
    const handleTriggerChange = ()=>{
        setIsSelectingTrigger(true)
        setOpenSelectTrigger(true)
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg text-black">App</h1>
                <div className="px-2 py-3 flex items-center justify-between w-[300px] h-[50px] border-[1px] border-gray-400 rounded-lg">
                    <div className="flex items-center border-[1px] border-[#ff4f00] w-1/2 rounded-lg px-4  bg-[#fff3e6]">
                        <img className="w-7" src={selectedTrigger.image} alt="img" />
                        {selectedTrigger.name}
                    </div> 
                    <Button onClick={handleTriggerChange} variant="action"className="bg-white border-[#7569cf] border-[1px] text-sm h-[30px] w-[70px] ">
                        Change
                    </Button>
                </div>
            </div>
            <Select onValueChange={(val) => setTriggerAction(selectedTrigger.triggerEvents[Number(val)])}>
                <SelectTrigger
                    className="w-[300px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {
                        selectedTrigger.triggerEvents.map((e,index) => {
                            return (
                                <SelectItem 
                                 className="text-base px-4 py-1 font-semibold bg-[#f7f6fd]" value={`${index}`}>
                                    {e.name}
                                </SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>
        </div>

    );
}