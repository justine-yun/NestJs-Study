import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatGateway } from "./chat.gateway";
import { Chatting, ChattingSchema } from "./models/chatting.model";
import { SocketModel, SocketSchema } from "./models/socket.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: SocketModel.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
