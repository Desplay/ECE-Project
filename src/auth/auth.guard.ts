import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTService } from 'src/common/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
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
