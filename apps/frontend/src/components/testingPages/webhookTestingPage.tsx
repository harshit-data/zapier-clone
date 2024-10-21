import { zapsAtom } from "@/atoms/atoms";
import { HOOKS_URL } from "@/config";
import {  SelectedTrigger } from "@/types";
import { useRecoilValue } from "recoil";


type Props = {
    selectedTrigger:SelectedTrigger,
}
export const WebhookTestingPage = ({selectedTrigger}:Props)=>{

    const zap = useRecoilValue(zapsAtom)
    console.log(zap)
    return (
        <div className="flex flex-col gap-3">
            <div>
                <h1 className="font-bold text-lg">Your Webhook URL</h1>
                <p className="">you'll need to configure your application with this Zap's webhook URL</p>
            </div>

            <div className="border-black border-[1px] px-4 py-2">
                <img src={selectedTrigger.image} className="w-7" alt="logo" />
            <div>{`${HOOKS_URL}/hooks/catch/1/`}</div>
            </div>
        </div>
    );
}
