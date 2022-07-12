import {SchemaOptions, Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {IsEmail, IsNotEmpty, MaxLength, MinLength, IsString, IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

const options: SchemaOptions = {
    timestamps: true
}

@Schema(options)
export class Cat extends Document {
    @ApiProperty({
        example: 'aaa@bbb.com',
        description: 'email',
        required: true
    })
    @Prop({
        required: true,
        unique: true
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'ahaha',
        description: 'name',
        required: true
    })
    @Prop({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    name: string;

    @ApiProperty({
        example: '12345678',
        description: 'password',
        required: true
    })
    @Prop({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @Prop({
        default: 'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg'
    })
    @IsNotEmpty()
    @IsUrl()
    imgUrl: string

    readonly readOnlyData: { id: string; email: string; name: string; imgUrl: string; };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        imgUrl: this.imgUrl
    };
});