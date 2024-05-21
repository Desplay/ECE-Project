import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthResponse,
  LoginResponse,
  UserSignIn,
  UserSignUp,
} from 'src/common/datatype/dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(FileInterceptor('no-file'))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Return token for user login',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'User not found',
  })
  async login(@Body() userSignIn: UserSignIn): Promise<LoginResponse> {
    const token = await this.authService.signIn(userSignIn);
    if (!token)
      throw new ForbiddenException('User not found or invalid data');
    const isAdmin = await this.authService.isAdmin(userSignIn);
    return { ...token, isAdmin };
  }

  @Post('signup')
  @ApiResponse({
    status: 200,
    description: 'Return token for user signup and login',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'User already exists or missing information',
  })
  async signup(@Body() userSignUp: UserSignUp): Promise<AuthResponse> {
    const token = await this.authService.signUp(userSignUp);
    if (!token)
      throw new ForbiddenException(
        'User already exists or something went wrong',
      );
    return token;
  }
}
