"use client"

import React from 'react'
import { Session } from 'next-auth'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@heroui/dropdown' 
import { Avatar } from '@heroui/avatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { signOutUser } from '@/app/actions/authActions'

type Props = {
    user: Session["user"]
}

export default function UserMenu({user}: Props){
    // Add null/undefined check for user
    if (!user) {
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
                    name = {user.name || "user avatar"}
                    size = "sm"
                    src = {user.image || "images/user.png"}
                     />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem key="SignInAs" isReadOnly as="span" className = "h-14 flex flex-row" aria-label="username"> Signed in as {user.name}</DropdownItem>
                </DropdownSection>
                <DropdownItem key="EditProfile" as = {Link} href = "/members/edit"> Edit Profile</DropdownItem>
                <DropdownItem key="Logout" color = "danger" onPress = {async () => signOutUser()}>Logout</DropdownItem>
            </DropdownMenu>
         </Dropdown>
    )
}