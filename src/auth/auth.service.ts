import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    console.log(process.env.TEST);
    return 'Hello World!';
  }
}
