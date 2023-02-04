import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AwsService } from "./aws.service";

@Controller("aws")
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post("test")
  @UseInterceptors(FileInterceptor("image"))
  async test(@UploadedFile() file: Express.Multer.File) {
    return await this.awsService.uploadFileToS3(file);
  }
}
