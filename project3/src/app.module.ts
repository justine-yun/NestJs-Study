import { Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
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
