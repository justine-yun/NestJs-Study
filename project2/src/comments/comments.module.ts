import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "src/cats/cats.module";
import { CommentsController } from "./comments.controller";
import { Comment, CommentSchema } from "./comments.schema";
import { CommentsService } from "./comments.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), CatsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
