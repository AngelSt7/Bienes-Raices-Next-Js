import cloudinary from "../config/cloudinary";

export class Cloudinary {
  static uploadImage = async (file: File, dimensions: { width: number; height: number }) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "bienesRaices",
            transformation: [{ width: dimensions.width, height: dimensions.height, crop: "fill", gravity: "auto" }],
          },
          (error, result) => {
            if (error) {
              console.error("Error en Cloudinary:", error);
              reject(error);
            } else {
              resolve(result?.secure_url || "");
            }
          }
        );
        uploadStream.end(buffer);
      });
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  static deleteImage = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error(`Error deleting image: ${error}`);
    }
};
}
