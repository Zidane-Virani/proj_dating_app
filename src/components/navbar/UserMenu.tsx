"use client"

import React from 'react'
import { Session } from 'next-auth'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@heroui/dropdown' 
import { Avatar } from '@heroui/avatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { signOutUser } from '@/app/actions/authActions'


type Props = {
    userInfo: {name: string | null, image: string | null} | null
}

export default function UserMenu({userInfo}: Props){
    // Add null/undefined check for user
    if (!userInfo) {
        return null; // or return a fallback UI
    }

    return (
         <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar 
                    isBordered
                    as = "button"
                    className = "transition-transform"
                    color = "secondary"
                    name = {userInfo.name || "user avatar"}
                    size = "sm"
                    src = {userInfo.image || "images/user.png"}
                     />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem key="SignInAs" isReadOnly as="span" className = "h-14 flex flex-row" aria-label="username"> Signed in as {userInfo.name}</DropdownItem>
                </DropdownSection>
                <DropdownItem key="EditProfile" as = {Link} href = "/members/edit"> Edit Profile</DropdownItem>
                <DropdownItem key="Logout" color = "danger" onPress = {async () => signOutUser()}>Logout</DropdownItem>
            </DropdownMenu>
         </Dropdown>
    )
}