import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Document } from "mongoose";

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
    isRequired: true,
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
    isRequired: true,
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
    isRequired: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual("readOnlyData").get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});