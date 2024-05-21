import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTService } from 'src/common/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = await this.jwtService.getPayloadFromHeader(
      request.headers,
    );
    if (!payload) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    return true;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = await this.jwtService.getPayloadFromHeader(
      request.headers,
    );
    if (!payload) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    const user = await this.userService.findUser(payload.userid);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.usertype === 'ADMIN') {
      return true;
    }
    throw new UnauthorizedException('User is not admin');
  }
}

export class AuthGuard {
  adminGuard = AdminGuard;
  userGuard = UserGuard;
}
