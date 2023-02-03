import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from "src/auth/auth.module";
import { Comment, CommentSchema } from "src/comments/comments.schema";
import { CatsController } from "./cats.controller";
import { CatsRepository } from "./cats.repository";
import { Cat, CatSchema } from "./cats.schema";
import { CatsService } from "./cats.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    MulterModule.register({
      dest: "./uploads",
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
