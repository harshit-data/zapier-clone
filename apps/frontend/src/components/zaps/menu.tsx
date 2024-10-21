import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { Ellipsis } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

type Props = {
    index:number,
    type:string,
    options:{
        name:string,
        icon?:JSX.Element,
        onCLick:(index:number)=>void
    }[]
}
export const Menu = ({type,options,index}:Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{type === "hor" ? <Ellipsis /> : <EllipsisVertical />}</DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    options.map((option,_)=>{
                        return <DropdownMenuItem onClick={()=>option.onCLick(index)}>{option.name}</DropdownMenuItem>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}