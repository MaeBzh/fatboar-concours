import { Module } from '@nestjs/common';
import { FileDownloaderController } from './file-downloader.controller';
import { FileDownloaderService } from './file-downloader.service';

@Module({
  controllers: [FileDownloaderController],
  providers: [FileDownloaderService]
})
export class FileDownloaderModule {}
