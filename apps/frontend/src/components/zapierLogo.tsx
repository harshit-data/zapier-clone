import { Link } from "react-router-dom";
import logo from "../assets/zapierLogo.svg"

export const ZapierLogo = ()=>{
    return (
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            <Link to={"/login"}><img src={logo} alt="Zapier"/></Link>
        </div>
    );
}