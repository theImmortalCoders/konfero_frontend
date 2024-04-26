import APIImageComponent from "@/hooks/imageAPI";
import Image, {StaticImageData} from "next/image";

export function Box({
                        children,
                        className,
                    }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <main
            className={`bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl px-4 py-4 sm:px-8 sm:py-8 ${className}`}
        >
            {children}
        </main>
    );
}

export function BoxWithImage({
                                 children,
                                 className,
                                 src,
                                 alt,
                             }: {
    children: React.ReactNode;
    className?: string;
    src: StaticImageData | string | number;
    alt: string;
}) {
    return (
        <div
            className={`bg-close2White items-start shadow-whiteShadow h-auto z-0 rounded-3xl ${className}`}
        >
            <div className="relative w-full">
                {typeof src !== "number" ? (
                    <Image
                        src={src}
                        alt={alt}
                        className="rounded-t-3xl w-full h-auto filter brightness-50"
                    />
                ) : (
                    <div className="rounded-t-3xl overflow-hidden w-full h-auto filter brightness-50">
                        <APIImageComponent imageId={src} type={"IMAGE"}/>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
