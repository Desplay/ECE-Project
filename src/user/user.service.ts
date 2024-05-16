import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSignUp } from 'src/common/datatype/dto/auth.dto';
import { User, UserEntity } from 'src/common/datatype/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async createUser(user: UserSignUp): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findUser(input: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findById(input);
    } catch (error) {}
    if (!user) {
      user =
        (await this.userModel.findOne({ username: input })) ||
        (await this.userModel.findOne({ email: input }));
    }
    return user;
  }

  async throwUserId(input: string): Promise<string> {
    const user =
      (await this.userModel.findOne({ email: input })) ||
      (await this.userModel.findOne({ username: input }));
    return user._id;
  }
}
