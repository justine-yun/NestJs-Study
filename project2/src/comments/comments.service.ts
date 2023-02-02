import { Injectable } from "@nestjs/common";
import { CommentCreateDto } from "./dto/comments.create.dto";

@Injectable()
export class CommentsService {
  async getAllComments() {
    return "hello world";
  }

  async createComment(id: string, comments: CommentCreateDto) {
    return `hello ${id}`;
  }

  async plusLike(id: string) {}
}
