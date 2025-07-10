"use client"

import React from "react"
import { NavbarItem } from "@heroui/navbar"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLinkProps = {
    href: string;
    label: string;
}

export default function Navlink({href, label}: NavLinkProps){
    const pathname = usePathname();
    
    return(
        <div>
            <NavbarItem isActive={pathname===href} as={Link} href={href}>{label}</NavbarItem>
        </div>
    )
}