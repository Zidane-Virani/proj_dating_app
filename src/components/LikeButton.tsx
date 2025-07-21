"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toggleLikeMember } from "@/app/actions/likeActions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  targetId: String;
  hasLiked: boolean;
};

export default function ({ targetId, hasLiked }: Props) {
  const router = useRouter();

  async function toggleLike() {
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  }

  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top[2px] -right[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasLiked ? "fill-rose-500" : "fill-neutral-700"}
      />
    </div>
  );
}
