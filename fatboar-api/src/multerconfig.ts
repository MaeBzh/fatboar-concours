import { HttpException, HttpStatus } from "@nestjs/common";
import { MulterModuleOptions } from "@nestjs/platform-express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, resolve } from "path";
import { v4 as uuid } from "uuid";

export const uploadPath = resolve(
  __dirname,
  `../${process.env.UPLOAD_RELATIVE_PATH ?? "uploads"}`
);

export const resolveFullPath = (relativePath: string) =>
  resolve(uploadPath, relativePath);

export const imageFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.match(/\/(jpg|jpeg|png|gif|bmp)$/)) {
    cb(null, true);
  } else {
    cb(
      new HttpException(`Only image file are allowed`, HttpStatus.BAD_REQUEST),
      false
    );
  }
};

export const pdfFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.match(/\/(pdf)$/)) {
    cb(null, true);
  } else {
    cb(
      new HttpException("Only pdf file are allowed", HttpStatus.BAD_REQUEST),
      false
    );
  }
};

export const multerOptions: MulterModuleOptions = {
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE || Infinity,
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      if (!existsSync(uploadPath)) mkdirSync(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, uuid() + extname(file.originalname));
    },
  }),
};
