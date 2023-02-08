import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";

const options: SchemaOptions = {
  id: false,
  timestamps: true,
};

@Schema(options)
export class SocketModel extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userName: string;
}

export const SocketSchema = SchemaFactory.createForClass(SocketModel);
