import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Document } from "mongoose";
import { SocketModel } from "./socket.model";

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);
