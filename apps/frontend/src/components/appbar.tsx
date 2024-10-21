import {useNavigate } from "react-router-dom";
import { LinkButton } from "./buttons/LinkButton.tsx"
import { PrimaryButton } from "./buttons/PrimaryButton.tsx";
import { ZapierLogo } from "./zapierLogo.tsx";
export const Appbar = () => {
    const navigate = useNavigate()
    return <div className="flex border-b justify-between p-4">
        <ZapierLogo />
        <div className="flex">
            <div className="pr-4">
                <LinkButton onClick={() => {
                    navigate("/login")
                }}>Contact Sales</LinkButton>
            </div>
            <div className="pr-4"><LinkButton onClick={() => {
                navigate("/login")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                navigate("/signup")
            }}>
                Signup
            </PrimaryButton>           
        </div>
    </div>
}