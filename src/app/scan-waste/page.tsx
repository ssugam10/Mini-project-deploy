"use client";
import React, { useState } from "react";
import axios from "axios";
import Toast from "@/utils/toast";

const Page: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (!imageFile) {
            Toast.ErrorShowToast("Please select an image.");
            return;
        }

        try {
            console.log("hello");

            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await axios.post("/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("returned back from backend after post request!");

            if (response.data.success) {
                setUploadedImage(response.data.filePath);
                Toast.SuccessshowToast("Image uploaded successfully.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            Toast.ErrorShowToast("Error uploading image.");
        }
    };

    return (
        <div className="flex flex-col mt-4 w-full mb-40">
            <h1 className="text-3xl font-bold mb-7">Scan Waste</h1>
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={uploadImage} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Upload Image
                </button>
                {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="mt-4" />}
            </div>
        </div>
    );
};

export default Page;
