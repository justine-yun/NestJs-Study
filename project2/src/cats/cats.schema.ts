import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";
import { Comment } from "src/comments/comments.schema";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: "cat0@google.com",
    description: "email",
    required: true,
  })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "cat0",
    description: "name",
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "123abc!@#",
    description: "password",
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: "http://aaa.com",
    description: "image url",
  })
  @Prop({
    type: String,
    default: "https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg",
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };

  readonly comments: Comment[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual("readOnlyData").get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

CatSchema.virtual("comments", {
  ref: "comments",
  localField: "_id",
  foreignField: "info",
});

CatSchema.set("toObject", { virtuals: true });
CatSchema.set("toJSON", { virtuals: true });
