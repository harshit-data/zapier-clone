import { useNavigate} from "react-router-dom";
import { LinkButton } from "./buttons/LinkButton";
import { ZapierLogo } from "./zapierLogo";
export const SignupAppbar = () => {
    const navigate = useNavigate()
    return <div className="flex border-b justify-between p-4">
        <ZapierLogo />
        <div className="flex">
        <div className="pr-4"><LinkButton onClick={() => {
                navigate("/login")
                }}>Login</LinkButton>
            </div>   
        </div>
    </div>
}