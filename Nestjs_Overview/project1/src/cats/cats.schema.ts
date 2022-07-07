import { SchemaOptions, Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {IsEmail, IsNotEmpty, MaxLength, MinLength, IsString, IsUrl} from "class-validator";

const options: SchemaOptions = {
    timestamps: true
}

@Schema(options)
export class Cat extends Document {
    @Prop({
        required: true,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @Prop({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    name: string;

    @Prop({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    imgUrl: string

    readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name
    };
});