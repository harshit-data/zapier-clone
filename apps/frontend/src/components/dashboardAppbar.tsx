import { ZapierLogo } from "./zapierLogo";
import { Profile } from "./profile";
export const DashboardAppbar = () => {
    return <div className="flex border-b justify-between p-4">
        <ZapierLogo />
        <div className="flex">
              <Profile />    
        </div>
    </div>
}