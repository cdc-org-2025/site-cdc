
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);

class UploadService {
  static async uploadToGCS(file) {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    const blob = bucket.file(uniqueName);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      public: true,
    });

    return new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        reject(err);
      });

      blobStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }
}

export default UploadService;
