import cloudinary from "./cloudinary";

// Define a custom type for the upload response
interface CloudinaryUploadResponse {
    secure_url: string;
    [key: string]: any; // Allow additional properties
}

// Define a custom type for the error response
interface CloudinaryUploadError {
    message: string;
    [key: string]: any; // Allow additional properties
}

export async function UploadImage(file: File, folder: string): Promise<CloudinaryUploadResponse> {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    resource_type: "auto",
                    folder: folder,
                },
                (err: CloudinaryUploadError | undefined, result: CloudinaryUploadResponse | undefined) => {
                    if (err) {
                        return reject(err.message || "Unknown error occurred");
                    }
                    if (result) {
                        return resolve(result);
                    }
                    return reject("Upload failed without error information.");
                },
            )
            .end(bytes);
    });
}
