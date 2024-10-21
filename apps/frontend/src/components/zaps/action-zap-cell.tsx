import { SelectedAction } from "@/types";
import thunderIcon from "@/assets/thunderIcon.svg"

type Props = {

    actionType: SelectedAction | null

}
export const ActionZapCell = ({ actionType }: Props) => {
    return (
        <div className="h-[90px] w-[350px] border-dotted pr-12 pl-4 py-2 border-4 border-gray-700 rounded-xl  cursor-pointer">
            {actionType && actionType?.availableActionId !== "" ?
            <div className="flex flex-col gap-3">

                <div className="flex h-[30px] rounded-lg max-w-[200px] items-center border-[1px] border-[#ff4f00] bg-[#fff3e6] px-6 py-3">
                    <img className="w-8" src={actionType.image} alt="img" />
                    <div className="text-lg text-black ">{actionType.name}</div>
                </div>
            </div>
            :
            <div className="flex flex-col gap-3">
                <div className="flex w-[130px] gap-3 px-2 items-center border-[1px] rounded-lg border-black bg-gray-200">
                    <img className="w-6" src={thunderIcon} alt="jpg" />
                    <div className="text-lg text-black ">Action</div>
                </div>
                <div className="text-base text-gray-500">
                    <span className="text-black ">1.</span>Select the event for your Zap to run
                </div>
            </div>
        }
        </div>
    );
}