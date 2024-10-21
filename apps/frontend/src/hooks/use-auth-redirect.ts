import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export async function useAuthRedirect(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    try{
        await axios.post(`${BACKEND_URL}/api/v1/user/verify-token`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        navigate("/dashboard")
    }
    catch(e){
        console.log(e)
    }
}