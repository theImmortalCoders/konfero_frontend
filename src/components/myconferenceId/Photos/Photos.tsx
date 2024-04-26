import {Box} from "@/components/common/Box/Box";
import TitleHeader from "@/components/common/Box/TitleHeader";
import {ImageInterface} from "@/hooks/imageAPI";
import AllImagesCarousel from "./Carousel/AllImagesCarousel";

export default function Photos({photos}: { photos: ImageInterface[] }) {
    return (
        <Box className="text-darkblue w-[90%] lg:w-[60%] mt-5 mb-20">
            <TitleHeader title={"Zdjęcia"}/>
            <div className="w-full pt-4">
                <AllImagesCarousel photos={photos}/>
            </div>
        </Box>
    );
}
