import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { Document, Types } from "mongoose";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    description: "댓글을 단 고양이의 id",
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "cats",
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: "작성 대상",
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: "cats",
  })
  @IsNotEmpty()
  info: Types.ObjectId;

  @ApiProperty({
    description: "댓글 컨텐츠",
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: "좋아요 수",
  })
  @Prop({
    type: Number,
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
