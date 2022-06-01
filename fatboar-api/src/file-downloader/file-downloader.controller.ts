import { Controller, Get, Param, Response } from '@nestjs/common';
import { FileDownloaderService } from './file-downloader.service';

@Controller('download')
export class FileDownloaderController {
  constructor(
    private readonly fileDownloaderService: FileDownloaderService,
  ) {}

  @Get(":filename")
  download(@Param('filename') filename: string) {
    return this.fileDownloaderService.download(filename);
  }
}
