import React from "react";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import { CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { getMemberPhotosByUserID } from "@/app/actions/memberActions";
import { Image } from "@heroui/image";

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const { userid } = await params;
  const photos = await getMemberPhotosByUserID(userid);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos?.map((photo) => (
              <div key={photo.id}>
                <Image
                  src={photo.url}
                  alt={"Imge of member"}
                  className="object-cover aspect-square"
                  width={300}
                  isZoomed
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
