"use client"

import React from "react";
import {Photo} from "@prisma/client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setMainImage } from "@/app/actions/userActions";
import MemberImage from "./MemberImage";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import { signIn } from 'next-auth/react';

type Props = {
    photos: Photo[] | null;
    editing?: boolean;
    mainImageUrl?: string | null;
}



export default function MemberPhotos({photos, editing, mainImageUrl}: Props){
    const router = useRouter();
    const [loading, setLoading] = useState({
        type: "",
        isLoading: false,
        id: ""
    })
    const refreshPage = async () => {
        await signIn("credentials", { redirect: false })
    }

    const onSetMain = async (photo: Photo) => {
        if (photo.url === mainImageUrl) return null;
        setLoading({isLoading: true, id: photo.id, type: "setMain"})
        await setMainImage(photo);
        router.refresh();
        setLoading({isLoading: false, id: "", type: ""})
        refreshPage();
    }

    


    return (
        <div className='grid grid-cols-5 gap-3 p-5'>
            {photos && photos.map(photo =>(
                <div key={photo.id} className='relative'>
                    <MemberImage photo={photo}/>
                    {editing && (
                        <>
                        <div onClick = {() => onSetMain(photo)} className="absolute top-3 left-3 z-50">
                            <StarButton selected={photo.url === mainImageUrl} loading={loading.isLoading && loading.id === photo.id && loading.type=="main"}/>
                        </div>
                        <div className="absolute top-3 right-3 z-50">
                            <DeleteButton loading={loading.isLoading && loading.id === photo.id}/>
                        </div>
                        </>
                    )}

                </div>
            ))}
        </div>
    )
}