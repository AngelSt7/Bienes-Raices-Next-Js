import { Cloudinary } from "@/src/class/Cloudinary";
import { ERRORS } from "@/src/utils/backend/errors/errors";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageMain = formData.get("imageMain") as File | null;
    const imagesGallery = formData.getAll("imagesGallery") as File[];

    let imageMainUrl = "";
    let galleryUrls: string[] = [''];

    if (imageMain instanceof File) {
      try {
        imageMainUrl = (await Cloudinary.uploadImage(imageMain, { width: 1920, height: 620 })) || "";
      } catch (err) {
        console.error("Error subiendo imageMain:", err);
      }
    }

    if (imagesGallery.length > 0) {
      try {
        galleryUrls = await Promise.all(
          imagesGallery.map(async (file) => (await Cloudinary.uploadImage(file, { width: 616, height: 353 })) || "")
        );
      } catch (err) {
        console.error("Error subiendo imagesGallery:", err);
      }
    }

    return NextResponse.json({ imageMainUrl, galleryUrls });
  } catch {
    return NextResponse.json(
      { error: ERRORS.IMAGE_UPLOAD_ERROR.message },
      { status: ERRORS.IMAGE_UPLOAD_ERROR.status }
    );
  }
}
