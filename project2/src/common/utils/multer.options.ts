import * as fs from "fs";
import * as path from "path";
import * as multer from "multer";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

const createFoler = (folder: string) => {
  try {
    console.log("Create a root uplodads folder...");

    fs.mkdirSync(path.join(__dirname, "..", "uploads"));
  } catch (err) {
    console.log("The folder already exists...");
  }

  try {
    console.log(`Create a ${folder} uploads folder`);

    fs.mkdirSync(path.join(__dirname, "..", "uploads", folder));
  } catch (err) {
    console.log(`The ${folder} folder already exists`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFoler(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      const folderName = path.join(path.join(__dirname, "..", "uploads", folder));

      cb(null, folderName);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);

      const fileName = `${path.basename(file.originalname, ext)}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
