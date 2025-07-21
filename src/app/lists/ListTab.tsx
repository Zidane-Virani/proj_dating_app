"use client";

import React from "react";
import { Member } from "@prisma/client";
import { Tabs, Tab } from "@heroui/tabs";
import { Key } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { start } from "repl";
import MemberCard from "../../app/members/MemberCard";
import LoadingComponents from "../../components/LoadingComponents";

type Props = {
  members: Member[];
  likeIds: string[];
};

export default function ListTab({ members, likeIds }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const tabs = [
    { id: "source", label: "Members I have Liked" },
    { id: "target", label: "Members that like me" },
    { id: "mutual", label: "Mutual Likes" },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div>
      <Tabs
        aria-label="like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <div>
                <LoadingComponents />
              </div>
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
