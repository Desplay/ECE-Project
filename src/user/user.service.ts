import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSignUp } from 'src/common/datatype/dto/auth.dto';
import { UserEntity } from 'src/common/datatype/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async createUser(user: UserSignUp): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
