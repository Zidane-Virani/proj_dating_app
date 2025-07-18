import React from 'react'
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import {CardHeader, CardBody} from "@heroui/card"
import {Divider} from "@heroui/divider"

export default async function MemberDetailedPage({params}: {params: Promise<{userid: string}>}) {
    const {userid} = await params;
    const member = await getMemberByUserId(userid);
    if (!member) return notFound();

    
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Profile
            </CardHeader>
            <Divider/>
            <CardBody>
                {member.description}
            </CardBody>

        </>
    )
}