"use client";
import { useState } from "react";
import { CropperProps, Area } from "react-easy-crop";
import Cropper from 'react-easy-crop';

export function ImageCropFrame() {

    const [crop, setCrop] = useState<CropperProps['crop']>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    const [fileCropped, setFileCropped] = useState<File>(new File([], ""));

    return (
        <>
        </>
    );
}