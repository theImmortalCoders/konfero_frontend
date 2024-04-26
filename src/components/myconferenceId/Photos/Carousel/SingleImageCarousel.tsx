import APIImageComponent, {ImageInterface} from "@/hooks/imageAPI";

export default function SingleImageCarousel({
                                                photo,
                                            }: {
    photo: ImageInterface;
}) {
    return (
        <div className="w-full flex justify-center items-center">
            <APIImageComponent imageId={photo.id} type={"IMAGE"}/>
        </div>
    );
}
