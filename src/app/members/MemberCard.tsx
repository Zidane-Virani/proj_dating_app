"use client";

import React from "react";
import { Member } from "@prisma/client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";
import { calculateAge } from "../../lib/utils";
import LikeButton from "@/components/LikeButton";

type Props = {
  member: Member;
  likeIds: string[];
};

export default function MemberCard({ member, likeIds }: Props) {
  const hasLiked = Array.isArray(likeIds) && likeIds.includes(member.userid);

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card fullWidth as={Link} href={`/members/${member.userid}`} isPressable>
      <Image
        src={member.image || "images/user.png"}
        alt={member.name}
        className="aspect-square object-cove"
        isZoomed
        width={300}
      />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targetId={member.userid} hasLiked={hasLiked}></LikeButton>
        </div>
      </div>
      <CardFooter className="flex justify-start bg-dark-gradient overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(new Date(member.dateOfBirth))}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
