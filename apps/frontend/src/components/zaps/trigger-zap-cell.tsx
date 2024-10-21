import { SelectedTrigger } from "@/types";
import thunderIcon from "@/assets/thunderIcon.svg"

type Props = {

    triggerType: SelectedTrigger | null
}
export const TriggerZapCell = ({ triggerType }: Props) => {
    return (
        <div className="border-dotted w-[350px] h-[90px] pr-12 pl-4 py-2 border-4 border-gray-700 rounded-xl  cursor-pointer">
            {triggerType?
            <div className="flex flex-col gap-2">

                <div className="flex h-[40px] rounded-lg items-center gap-3 border-[1px] max-w-[200px] border-[#ff4f00] bg-[#fff3e6] pl-2 py-3">
                    <img className="w-8" src={triggerType.image} alt="img" />
                    <div className="text-lg text-black ">{triggerType.name}</div>
                </div>
                {/* <div className="text-base text-gray-500">
                    <span className="text-black ">1.</span>Select the event that starts your Zap
                </div> */}
            </div>
            :
            <div className="flex flex-col gap-3">
                <div className="flex w-[130px] gap-3 px-2 items-center border-[1px] rounded-lg border-black bg-gray-200">
                    <img className="w-6" src={thunderIcon} alt="jpg" />
                    <div className="text-lg text-black ">Trigger</div>
                </div>
                <div className="text-base text-gray-500">
                    <span className="text-black ">1.</span>Select the event that starts your Zap
                </div>
            </div>
        }
        </div>
    );
}