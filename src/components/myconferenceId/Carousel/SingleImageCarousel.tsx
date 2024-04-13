"use client";
import { Image } from "@/hooks/conference";
import APIImageComponent from "@/hooks/imageAPI";

export default function SingleImageCarousel({ photos }: { photos: Image }) {
  console.log("photos2", photos);
  return (
    <div className="w-full flex justify-center items-center">
      <APIImageComponent imageId={0} type={""} />
    </div>
  );
}
