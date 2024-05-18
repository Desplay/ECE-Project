import { ApiProperty } from '@nestjs/swagger';

export class UserSignIn {
  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: true })
  password: string;
}

export class UserSignUp {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  username: string;
}

export class AuthResponse {
  @ApiProperty()
  bearer: string;
}

export class LoginResponse extends AuthResponse {
  @ApiProperty()
  isAdmin: boolean;
}
