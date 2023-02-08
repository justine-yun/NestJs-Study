import { Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AppController } from "./app.controller";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly isDev = process.env.MODE === "dev";

  configure() {
    mongoose.set("debug", this.isDev);
  }
}
