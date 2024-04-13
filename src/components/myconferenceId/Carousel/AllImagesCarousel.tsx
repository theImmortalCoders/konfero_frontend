import Carousel from "react-multi-carousel";
import SingleImageCarousel from "./SingleImageCarousel";
import { Image } from "@/hooks/conference";

export default function AllImagesCarousel({ photos }: { photos: Image[] }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1424, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 1,
    },
  };
  console.log("photos1", photos);
  return (
    <Carousel
      responsive={responsive}
      ssr
      showDots={true}
      slidesToSlide={1}
      containerClass={`w-full flex justify-start items-center lg:w-[70vw] mt-2 pb-10 hidden`}
      itemClass={"px-3 flex justify-start items-center"}
      deviceType={""}
      centerMode={false}
      className={`mb-4 flex items-center ${
        photos && photos.length > 3 ? "justify-start" : "justify-center"
      }`}
    >
      {photos &&
        photos.map((photos, index) => (
          <SingleImageCarousel key={index} photos={photos} />
        ))}
    </Carousel>
  );
}
