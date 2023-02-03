import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class AwsService {
  private readonly awsS3: AWS.S3;
  public readonly s3BucketName: string;

  constructor() {
    this.awsS3 = new AWS.S3({});
  }
}
