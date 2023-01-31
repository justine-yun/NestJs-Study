import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CatsModule } from "src/cats/cats.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: "7d",
      },
    }),
    CatsModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
