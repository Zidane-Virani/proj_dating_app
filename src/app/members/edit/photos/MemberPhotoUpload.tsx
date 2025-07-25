"use client"

import React from "react";
import ImageUploadButton from "@/components/image_upload_button";
import { useRouter } from "next/navigation";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { addImage } from "@/app/actions/userActions";
import {toast} from "react-toastify"




export default function MemberPhotoUpload(){
    const router = useRouter();

    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === "object"){
            await addImage(result.info.secure_url, result.info.public_id);
            router.refresh()
        }else{
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="pt-5 pl-5">
            <ImageUploadButton onUploadImage={onAddImage}/>
        </div>
    )
}