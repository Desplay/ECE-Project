import { ApiProperty } from '@nestjs/swagger';

export class UserSignIn {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserSignUp {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;
}

export class AuthResponse {
  @ApiProperty()
  token: string;
}
