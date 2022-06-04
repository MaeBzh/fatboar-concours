import { HttpException, Injectable, StreamableFile } from "@nestjs/common";
import { createReadStream, existsSync } from "fs";
import { lookup } from "mime-types";
import { resolveFullPath } from "../multerconfig";

@Injectable()
export class FileDownloaderService {
  constructor() {}

  download(filename: string): StreamableFile {
    const filepath = resolveFullPath(filename);

    if (!existsSync(filepath)) {
      throw new HttpException(`File ${filename} does not exists`, 404);
    }

    const file = createReadStream(filepath);
    return new StreamableFile(file, {
      type: lookup(filepath) || "application/octet-stream",
    });
  }
}
