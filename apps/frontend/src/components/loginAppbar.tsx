import { useNavigate} from "react-router-dom";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { ZapierLogo } from "./zapierLogo";
export const LoginAppbar = () => {
    const navigate = useNavigate()
    return <div className="flex border-b justify-between p-4">
        <ZapierLogo />
        <div className="flex">
            <PrimaryButton onClick={() => {
                navigate("/signup")
            }}>
                Signup
            </PrimaryButton>      
        </div>
    </div>
}