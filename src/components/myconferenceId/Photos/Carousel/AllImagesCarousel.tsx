import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SingleImageCarousel from "./SingleImageCarousel";
import {ImageInterface} from "@/hooks/imageAPI";

export default function AllImagesCarousel({
                                              photos,
                                          }: {
    photos: ImageInterface[];
}) {
    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1424},
            items: 4,
        },
        tablet: {
            breakpoint: {max: 1424, min: 664},
            items: 2,
        },
        mobile: {
            breakpoint: {max: 664, min: 0},
            items: 1,
        },
    };

    return (
        <Carousel
            responsive={responsive}
            ssr
            showDots={true}
            containerClass={`w-full flex justify-start items-center mt-2 pb-10`}
            itemClass={"px-3 flex justify-start items-center"}
            centerMode={true}
            className={`mb-4 flex items-center ${
                photos && photos.length > 3 ? "justify-start" : "justify-center"
            }`}
        >
            {photos.map((photo, index) => (
                <SingleImageCarousel key={index} photo={photo}/>
            ))}
        </Carousel>
    );
}
