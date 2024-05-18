import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty({ type: 'string' })
  message: string;
}
