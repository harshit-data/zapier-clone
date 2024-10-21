
import { DashboardAppbar } from "../components/dashboardAppbar.tsx";
import { ShowZaps } from "../components/zaps/show-zaps.tsx";

export default function() {
    return <div>
        <DashboardAppbar />
        <div className="flex pt-8 px-4">
            <div className="w-full">
                <div className="flex justify-between ">
                    <ShowZaps />
                </div>
            </div>
        </div>
        {/* show loading before recieving the zaps from */}
    </div>
}

