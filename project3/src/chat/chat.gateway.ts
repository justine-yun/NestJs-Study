import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Model } from "mongoose";
import { Socket } from "socket.io";
import { Chatting } from "./models/chatting.model";
import { SocketModel } from "./models/socket.model";

@WebSocketGateway({ namespace: "chatting" })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger("chat");

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name) private readonly socketModel: Model<SocketModel>,
  ) {}

  afterInit() {
    this.logger.log("init");
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const socketId = socket.id;

    const userSocket = await this.socketModel.findOne({ id: socketId });

    if (userSocket) {
      socket.broadcast.emit("disconnect_user", userSocket.userName);

      await userSocket.delete();
    }

    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage("new_user")
  async handleNewUser(@MessageBody() userName: string, @ConnectedSocket() socket: Socket) {
    const uniqueUserName = `${userName}#${new Date().getTime().toString(16).slice(0, 10)}`;

    await this.socketModel.create({
      id: socket.id,
      userName: uniqueUserName,
    });

    socket.broadcast.emit("user_connected", uniqueUserName);
    return uniqueUserName;
  }

  @SubscribeMessage("submit_chat")
  async handleSubmitChat(@MessageBody() chat: string, @ConnectedSocket() socket: Socket) {
    const userSocket = await this.socketModel.findOne({ id: socket.id });

    await this.chattingModel.create({
      user: userSocket,
      chat,
    });

    socket.broadcast.emit("new_chat", {
      chat,
      userName: userSocket.userName,
    });
  }
}
