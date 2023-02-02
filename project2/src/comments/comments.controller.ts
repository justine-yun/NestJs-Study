import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CommentCreateDto } from "./dto/comments.create.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({
    summary: "모든 고양이 프로필에 적힌 댓글 가져오기",
  })
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @Post(":id")
  @ApiOperation({
    summary: "특정 고양이 프로필에 댓글 달기",
  })
  async createComment(@Param("id") id: string, @Body() body: CommentCreateDto) {
    return await this.commentsService.createComment(id, body);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "좋아요 수 올리기",
  })
  async plusLike(@Param("id") id: string) {
    return await this.commentsService.plusLike(id);
  }
}
