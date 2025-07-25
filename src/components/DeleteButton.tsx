import React from "react";
import { AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";


type Props  = {
    loading: boolean;
}

export default function DeleteButton({ loading}: Props) {
    return (
        <div className = "relative hover:opacity-80 tansition cursor-pointer">
            {!loading ? (
                <>
                    <AiOutlineDelete size = {32} className="fill-white absolute -top-[2px] -right-[2px]"/>
                    <AiFillDelete size = {28} className="fill-red-600"/>
                </>
                
            ):(
                <PiSpinnerGap size = {32} className = "animate-spin fill-white"/>
            )}
                
            
        </div>
    )
}