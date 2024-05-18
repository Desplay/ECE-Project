import { ApiProperty } from '@nestjs/swagger';

export class Survey {
  @ApiProperty({ required: true })
  category: string;

  @ApiProperty({ required: true })
  color: string;

  @ApiProperty({ required: true })
  size: string;

  @ApiProperty({ required: true })
  model: string;
}

export class ProfileDTO {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  survey: Survey;
}
