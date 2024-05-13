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
    return createdUser.save();
  }

  async findOneByName(username: string): Promise<User> {
    return this.userModel.findOne({ name: username });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async throwUserId(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email: email });
    return user._id;
  }
}
