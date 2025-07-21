"use server";
import { auth } from "../../../auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (isLiked) {
      await prisma.like.delete({
        data: {
          sourceUserID: userId,
          targetUserId,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: { sourceUserId: userId },
      select: { targetUserId: true },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchLikesForMember(type = "source") {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchCurrentUserLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function fetchSourceLikes(userId: string | null) {
  if (!userId) return [];

  const sourceList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember: true, // not "targetMembers" — assuming it's a singular relation
    },
  });

  return sourceList.map((like) => like.targetMember);
}

async function fetchCurrentUserLikes(userId: string | null) {
  if (!userId) return [];

  const targetList = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    select: {
      targetMember: true, // not "targetMembers" — assuming it's a singular relation
    },
  });

  return targetList.map((like) => like.targetMember);
}

async function fetchMutualLikes(userId: string | null) {
  const likedUsers = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetUserId: true,
    },
  });
  const likedIds = likedUsers.map((like) => like.targetUserId);
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });
  return mutualList.map((like) => like.sourceMember);
}
