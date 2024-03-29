import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Comment } from "src/comments/comments.schema";
import { Cat } from "./cats.schema";
import { CatRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email }).lean().exec();

      return result ? true : false;
    } catch (error) {
      throw new HttpException("DB error", 500);
    }
  }

  async create(cat: CatRequestDto) {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });

    return cat;
  }

  async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select("-password");

    return cat;
  }

  async findByIdAndUpdateImg(id: string, filePath: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = process.env.AWS_S3_OBJECT_URL + filePath;

    const updatedCat = await cat.save();

    return updatedCat.readOnlyData;
  }

  async findAll() {
    const allCat = await this.catModel.find().populate({ path: "comments", model: this.commentModel });

    return allCat;
  }
}
