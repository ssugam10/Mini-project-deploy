// src/app/api/upload-image/route.ts (or page.tsx for older Next.js)
import { UploadImage } from "@/libs/uploadImage"; // Your uploadImage function
import { NextRequest, NextResponse } from "next/server";

// Disable body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        console.log("hello from backend");

        const formData = await req.formData();
        const image = formData.get("image");

        if (!image || !(image instanceof File)) {
            return NextResponse.json({ error: "No image file provided." }, { status: 400 });
        }

        // Call the UploadImage function
        const data = await UploadImage(image, "images");

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
