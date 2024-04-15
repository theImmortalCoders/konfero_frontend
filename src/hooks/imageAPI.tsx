"use client";
import { useEffect, useState } from "react";
import { appAPI } from "@/utils/appENV";

interface APIImageComponentProps {
  imageId: number;
  type: string;
  full?: boolean;
}

const APIImageComponent: React.FC<APIImageComponentProps> = ({
  imageId,
  type,
  full,
}) => {
  const [imageData, setImageData] = useState<string>("");
  const [defaultImg, setDefaultImage] = useState("question.jpg");

  useEffect(() => {
    const downloadImage = async () => {
      try {
        if (!imageId) {
          setImageData("");
          if (type === "") {
            setDefaultImage("");
          } else {
            setDefaultImage("question.jpg");
          }
        } else {
          const response = await appAPI.get(`/api/file/${imageId}/image`, {
            responseType: "arraybuffer",
          });

          if (response.status === 200) {
            const base64Image = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );

            const imageSrc = `data:image/png;base64,${base64Image}`;

            setImageData(imageSrc);
          } else {
            console.error("Wystąpił błąd podczas wyświetlania zdjęcia");
            return "Wystąpił błąd podczas wyświetlania zdjęcia";
          }
        }
      } catch (error) {
        window.location.replace("/500");
      }
    };

    downloadImage();
  }, [imageId]);

  return (
    <>
      {imageData !== "" ? (
        <img
          className={` ${
            full ? "w-full opacity-25 fixed left-0 top-0 -z-10" : "relative"
          } object-fill object-center h-auto w-full`}
          src={imageData}
          alt="photo"
        />
      ) : (
        <img
          className={`${
            full ? "w-full opacity-25 fixed left-0 top-0 -z-10" : "relative"
          }  object-fill object-center h-auto w-full`}
          src={`/assets/common/${defaultImg}`}
          alt="defaultPhoto"
        />
      )}
    </>
  );
};

export default APIImageComponent;
