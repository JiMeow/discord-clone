"use-client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

type FileUploadProps = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
};

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileTypes = value?.split(".").pop();

  if (value && fileTypes !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image
          fill
          src={value}
          alt="Upload"
          objectFit="cover"
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="w-6 h-6 absolute top-0 right-0 p-1 text-white 
          bg-rose-500 rounded-full shadow-sm"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
};

export default FileUpload;
