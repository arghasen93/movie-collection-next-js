"use client";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import SpinnerOverlay from "../SpinnerOverlay";

export default function UploadPage() {
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();

      const base64Data = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setIsLoading(true);
      setUploadStatus("Uploading...");

      const response = await axios.post("/api/upload-movie", base64Data, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      setUploadStatus(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <SpinnerOverlay />}
      <div className="space-y-4">
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Choose File
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileUpload}
          className="hidden"
        />

        <p className="text-sm text-gray-600">{uploadStatus}</p>
      </div>
    </>
  );
}
