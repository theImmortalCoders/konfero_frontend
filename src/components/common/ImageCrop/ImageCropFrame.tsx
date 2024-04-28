"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CropperProps, Area } from "react-easy-crop";
import Cropper from 'react-easy-crop';

export function ImageCropFrame(
    {
    inputDescription,
    formName,
    imageFile,
    setImageFile,
    } 
    : 
    {
    inputDescription : string, 
    formName : string,
    imageFile: File;
    setImageFile: Dispatch<SetStateAction<File>>;
    }) {

    // const [imageFile, setImageFile] = useState<File>(new File([], ""));
    const [crop, setCrop] = useState<CropperProps['crop']>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    const [fileCropped, setFileCropped] = useState<File>(new File([], ""));

    const onCropChange = useCallback((crop: CropperProps['crop']) => {
        setCrop(crop);
    }, []);
    
    const onZoomChange = useCallback((zoom: number) => {
        setZoom(zoom);
    }, []);
    
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target) {
              setImage(event.target.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        }
        if (e.target.files) {
          setFileCropped(e.target.files[0]);
        }
    };
    
    const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    
    function cropImage(imageFile: File, croppedAreaPixels: Area): Promise<File> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Canvas context not supported'));
                        return;
                    }
                    canvas.width = croppedAreaPixels.width;
                    canvas.height = croppedAreaPixels.height;
                    ctx.drawImage(
                        image,
                        croppedAreaPixels.x,
                        croppedAreaPixels.y,
                        croppedAreaPixels.width,
                        croppedAreaPixels.height,
                        0,
                        0,
                        croppedAreaPixels.width,
                        croppedAreaPixels.height
                    );
    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const croppedFile = new File([blob], 'cropped-image.png', { type: 'image/png' });
                            resolve(croppedFile);
                        } else {
                            reject(new Error('Failed to create blob'));
                        }
                    }, 'image/png');
                };
                image.onerror = () => {
                    reject(new Error('Failed to load image'));
                };
                image.src = event.target?.result as string;
            };
            reader.onerror = () => {
                reject(new Error('Failed to read image file'));
            };
            reader.readAsDataURL(imageFile);
        });
    }
    
    function changePhoto() {
        if(croppedAreaPixels){
            cropImage(fileCropped, croppedAreaPixels)
                .then((croppedImageFile) => {
                  setImageFile(croppedImageFile);
                })
                .catch((error) => {
                  console.error(error);
                });
        }
    }
    
    return (
        <>
            <p className="w-full outline-none focus:outline-none bg-close2White text-darkblue font-bold">
                {inputDescription}
            </p>
            <div className="flex flex-row items-center justify-center py-2 bg-close2White ">
                <div className='z-50 w-full h-64 flex flex-col items-start'>
                <form id={`${formName}`}>
                    <input type="file" accept=".png, .jpg, .jpeg" onChange={onSelectFile} className="w-full outline-none focus:outline-none bg-close2White text-blue"/>
                </form>
                {image && (
                    <>
                    <div className='mt-4 w-52 h-52 relative'>
                        <Cropper
                            image={image.toString()}
                            crop={crop}
                            zoom={zoom}
                            aspect={16/11}
                            onCropChange={onCropChange}
                            onZoomChange={onZoomChange}
                            onCropComplete={handleCropComplete}
                        />
                    </div>
                    <button
                        className="bg-blue text-close2White rounded-3xl mt-2 px-2 py-1 w-52"
                        onClick={changePhoto}
                    >
                        WYBIERZ
                    </button>
                    </>
                )}
                </div>
            </div>
        </>
    );
}