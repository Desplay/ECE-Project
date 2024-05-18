import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Payload } from '../datatype/dto/payload.dto';

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async getPayloadFromHeader(header: any): Promise<Payload> {
    const token = header['authorization'];
    if (!token) {
      return undefined;
    }
    return await this.validateToken(token);
  }

  async generateToken(payload: any): Promise<string> {
    const newPayload = {
      ...payload,
      iat: new Date().getTime(),
      exp: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    };
    return this.jwtService.sign(newPayload);
  }

  private async validateToken(token: string): Promise<Payload> {
    const payload = await this.decode(token);
    if (!payload) {
      return undefined;
    }
    const user = await this.userService.findUser(payload.userId);
    if (!user) {
      return undefined;
    }
    return payload;
  }

  private async decode(token: string): Promise<Payload> {
    const payload = await this.jwtService.verifyAsync(token);
    return this.validatePayload(payload) ? payload : null;
  }

  private async validatePayload(payload: Payload): Promise<boolean> {
    const valid_payload =
      payload['userid'] && payload['iat'] && payload['exp'];
    if (!valid_payload) {
      return false;
    }
    const timeNow = new Date().getTime();
    const Invalid_time =
      timeNow < payload['iat'] || timeNow > payload['exp'];
    if (Invalid_time) return false;
    const user = await this.userService.findUser(payload.userId);
    return user ? true : false;
  }
}
