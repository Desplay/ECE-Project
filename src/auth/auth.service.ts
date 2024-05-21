import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  UserSignIn,
  UserSignUp,
} from 'src/common/datatype/dto/auth.dto';
import { User } from 'src/common/datatype/entity/user.entity';
import { JWTService } from 'src/common/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  // đăng nhập sau đó trả về token
  async signIn(user: UserSignIn): Promise<AuthResponse> {
    const user_found: User =
      (await this.userService.findUser(user.email)) ||
      (await this.userService.findUser(user.username));
    if (!user_found) {
      return undefined;
    }
    const userid: string = await this.userService.throwUserId(
      user.email || user.username,
    );
    const payload = {
      userid: userid,
    };
    const token: string = await this.jwtService.generateToken(payload);
    return { bearer: token };
  }

  // Tạo user sau đó trả về token
  async signUp(user: UserSignUp): Promise<AuthResponse> {
    const user_found: User = await this.userService.findUser(user.email);
    if (user_found) {
      return undefined;
    }
    await this.userService.createUser(user);
    const userid: string = await this.userService.throwUserId(user.email);
    const payload = {
      userid: userid,
    };
    const token: string = await this.jwtService.generateToken(payload);
    return { bearer: token };
  }

  // Kiểm tra xem user có phải admin không
  async isAdmin(user: UserSignIn): Promise<boolean> {
    const user_found: User =
      (await this.userService.findUser(user.email)) ||
      (await this.userService.findUser(user.username));
    if (!user_found) {
      return undefined;
    }
    return user_found.usertype === 'ADMIN';
  }
}
