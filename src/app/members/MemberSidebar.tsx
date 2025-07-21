"use client";

import React from "react";
import { Member } from "@prisma/client";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { calculateAge } from "../../lib/utils";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";

type Props = {
  member: Member;
};

export default function MemberSidebar({ member }: Props) {
  const pathname = usePathname();
  const basePath = `/members/${member.userid}`;

  const navLinks = [
    { name: "Profile", href: `${basePath}/profile` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        src={member.image || "images/user.png"}
        alt={member.name}
        className="rounded-full mt-6 aspect-square object-cover"
        isZoomed
        height={200}
        width={200}
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {member.name}, {calculateAge(new Date(member.dateOfBirth))}
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block rounded ${pathname === link.href ? "text-secondary" : "hover:text-secondary/50"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          variant="bordered"
          color="secondary"
        >
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
}
