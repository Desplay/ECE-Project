import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  UserSignIn,
  UserSignUp,
} from 'src/common/datatype/dto/auth.dto';
import { JWTService } from 'src/common/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  getHello(): string {
    console.log(process.env.TEST);
    return 'Hello World!';
  }

  // đăng nhập sau đó trả về token
  async signIn(user: UserSignIn): Promise<AuthResponse> {
    const user_found = await this.userService.findOneByEmail(user.email);
    if (!user_found) {
      return undefined;
    }
    const userId = await this.userService.throwUserId(user.email);
    const payload = {
      userid: userId,
    };
    const token = await this.jwtService.generateToken(payload);
    return { bearer: token };
  }

  async signUp(user: UserSignUp): Promise<AuthResponse> {
    const user_found = await this.userService.findOneByEmail(user.email);
    if (user_found) {
      return undefined;
    }
    const userId = await this.userService.createUser(user);
    const payload = {
      userid: userId,
    };
    const token = await this.jwtService.generateToken(payload);
    return { bearer: token };
  }
}
