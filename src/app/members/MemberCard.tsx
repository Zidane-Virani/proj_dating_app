import React from "react"
import { Member } from "@prisma/client"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {Image} from "@heroui/image";
import Link from "next/link";
import {calculateAge} from "../../lib/utils"

type Props = {
    member: Member
}

export default function MemberCard ({member}: Props) {
    return (
        <Card
            fullWidth
            as = {Link}
            href = {`/members/${member.userid}`}
            isPressable
        >
            <Image
                src={member.image || "images/user.png"}
                alt={member.name}
                className="aspect-square object-cove"
                isZoomed
                width={300}
            />
            <CardFooter 
                className="flex justify-start bg-dark-gradient overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
                <div className="flex flex-col text-white">
                    <span className="font-semibold">{member.name}, {calculateAge(new Date(member.dateOfBirth))}</span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

