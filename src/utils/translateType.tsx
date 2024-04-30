import {
  FaFileAudio,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaFile,
} from "react-icons/fa";

export function translateType(type: string): string {
  const translations: Record<string, string> = {
    IMAGE: "Obraz",
    DOCUMENT: "Dokument",
    VIDEO: "Wideo",
    SOUND: "Dźwięk",
    UNDEFINED: "Inny",
  };

  return translations[type] || "Nieznany Typ";
}

export function renderFileTypeIcon(type: string): JSX.Element {
  switch (type) {
    case "IMAGE":
      return (
        <FaFileImage className="flex w-full h-full justify-center items-center" />
      );
    case "DOCUMENT":
      return (
        <FaFileAlt className="flex w-full h-full justify-center items-center" />
      );
    case "VIDEO":
      return (
        <FaFileVideo className="flex w-full h-full justify-center items-center" />
      );
    case "SOUND":
      return (
        <FaFileAudio className="flex w-full h-full justify-center items-center" />
      );
    case "UNDEFINED":
      return (
        <FaFile className="flex w-full h-full justify-center items-center" />
      );
    default:
      return (
        <FaFile className="flex w-full h-full justify-center items-center" />
      );
  }
}
