import { ImageInterface } from "@/hooks/conference";
import APIImageComponent from "@/hooks/imageAPI";

export default function SingleImageCarousel({
  photo,
}: {
  photo: ImageInterface;
}) {
  return (
    <div className="w-full flex justify-center items-center">
      <APIImageComponent imageId={photo.id} type={"IMAGE"} />
    </div>
  );
}
