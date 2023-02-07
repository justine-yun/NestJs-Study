import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage("new_user")
  handleMessage(@MessageBody() userName: string, @ConnectedSocket() socket: Socket) {
    socket.emit("hello_user", "hello " + userName);
  }
}
