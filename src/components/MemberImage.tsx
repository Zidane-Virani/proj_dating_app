"use client"

import React from "react";
import {Photo} from "@prisma/client"
import {CldImage} from "next-cloudinary"
import {Image} from "@heroui/image"

type Props = {
    photo: Photo | null;
}

export default function MemberImae({photo} : Props){
    return (
        <div>
            {photo?.publicId? (
                <CldImage
                src={photo.publicId}
                alt="Member Image"
                width={300}
                height={300}
                crop="fill"
                gravity="faces"
                className="rounded-2xl"

                />
            ):(
                <Image
                    width={220}
                    height={220}
                    src={photo?.url || "/images/user.png"}
                    alt="Image of User"
                />
            )}
        </div>
    )
}