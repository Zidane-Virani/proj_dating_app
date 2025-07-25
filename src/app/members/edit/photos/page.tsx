import React from 'react'
import Image from 'next/image'
import { CardHeader, CardBody } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberPhotosByUserID } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'
import DeleteButton from '@/components/DeleteButton'
import StarButton from '@/components/StarButton'
import ImageUploadButton from '@/components/image_upload_button'
import MemberPhotoUpload from './MemberPhotoUpload'
import MemberImage from '@/components/MemberImage'
import MemberPhotos from '@/components/MemberPhotos'
import { getMemberByUserId } from '@/app/actions/memberActions'

export default async function PhotosPage(){
    const userId = await getAuthUserId();
    if (!userId) return notFound();
    const member = await getMemberByUserId(userId);
    if (!member) return notFound();
    const photos = await getMemberPhotosByUserID(userId);
    console.log(photos);
    console.log("*****");
    console.log(userId);
    console.log("*****");
    return (
        <div>
            <>
                <CardHeader className='text-2xl font-semibold text-secondary'>
                    Edit Profile
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div className="pt-5 pl-5">
                        <MemberPhotoUpload/>
                        <MemberPhotos photos={photos} editing={true} mainImageUrl={member.image}/>
                    </div>
                </CardBody>
            </>
        </div>
    )
}