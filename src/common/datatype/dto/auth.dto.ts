import { ApiProperty } from '@nestjs/swagger';

export class UserSignIn {
  @ApiProperty()
  email?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  password: string;
}

export class UserSignUp {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;
}

export class AuthResponse {
  @ApiProperty()
  bearer: string;
}
