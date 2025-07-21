import React from "react";
import ListTab from "./ListTab";
import {
  fetchCurrentUserLikeIds,
  fetchLikesForMember,
} from "../actions/likeActions";

export default async function ListsPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;
  const likeIds = await fetchCurrentUserLikeIds;
  const members = await fetchLikesForMember(type);

  return (
    <div>
      <ListTab members={members} likeIds={likeIds} />
    </div>
  );
}
