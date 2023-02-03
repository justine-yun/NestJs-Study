import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import mongoose from "mongoose";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { CatsModule } from "./cats/cats.module";
import { AuthModule } from "./auth/auth.module";
import { CommentsModule } from './comments/comments.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
    AuthModule,
    CommentsModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === "dev";

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    mongoose.set("debug", this.isDev);
  }
}
