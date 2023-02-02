import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CatsRepository } from "src/cats/cats.repository";
import { Comment } from "./comments.schema";
import { CommentCreateDto } from "./dto/comments.create.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      const allComment = await this.commentModel.find();

      return allComment;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async createComment(id: string, commentData: CommentCreateDto) {
    try {
      const { author, contents } = commentData;

      const validatedCat = await this.catsRepository.findCatByIdWithoutPassword(author);
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id);

      const newComment = new this.commentModel({
        author: validatedCat._id,
        info: targetCat._id,
        contents,
      });

      return await newComment.save();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async plusLike(id: string) {
    const comment = await this.commentModel.findById(id);

    comment.likeCount += 1;

    return await comment.save();
  }
}
