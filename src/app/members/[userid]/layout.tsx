import React from 'react'
import {getMemberByUserId} from "@/app/actions/memberActions"
import MemberSidebar from '../MemberSidebar'
import { notFound } from 'next/navigation'
import {Card} from "@heroui/card"

export default async function Layout({children, params}: {children: React.ReactNode, params: Promise<{userid: string}>}) {

    const {userid} = await params;
    const member = await getMemberByUserId(userid);

    if (!member) return notFound();

    const basePath = `/members/${member.userid}`;

    const navLinks = [
        { name: "Profile", href: `${basePath}/profile` },
        { name: "Photos", href: `${basePath}/photos` },
        { name: "Chat", href: `${basePath}/chat` },
    ];


     return (
        <div className='grid grid-cols-12 gap-5 h-[80vh]'>
            <div className='col-span-3'>
                <MemberSidebar member={member} navLinks={navLinks}/>
            </div>
            <div className='col-span-9'>
                <Card className='w-full mt-10 h-[80vh]'>
                    {children}
                </Card>
            </div>
        </div>
     );
}