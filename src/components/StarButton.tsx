import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";


type Props  = {
    selected: boolean;
    loading: boolean;
}

export default function StarButton({selected, loading}: Props) {
    return (
        <div className = "relative hover:opacity-80 tansition cursor-pointer">
            {!loading ? (
                <>
                    <AiOutlineStar size = {32} className="fill-white absolute -top-[2px] -right-[2px]"/>
                    <AiFillStar size = {28} className={selected? "fill-yellow-500" : "fill-neutral-500/70"}/>
                </>
                
            ):(
                <PiSpinnerGap size = {32} className = "animate-spin fill-white"/>
            )}
                
            
        </div>
    )
}