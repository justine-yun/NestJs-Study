import { HttpException, Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class AwsService {
  private readonly awsS3: AWS.S3;
  public readonly s3BucketName: string;

  constructor() {
    this.awsS3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_REGION,
    });
    this.s3BucketName = process.env.AWS_S3_BUCKET;
  }

  async uploadFileToS3(file: Express.Multer.File) {
    try {
      const s3Object = await this.awsS3
        .putObject({
          Bucket: this.s3BucketName,
          Key: "test/" + file.originalname,
          Body: file.buffer,
          ACL: "bucket-owner-full-control",
          ContentType: file.mimetype,
        })
        .promise();

      return { s3Object };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
