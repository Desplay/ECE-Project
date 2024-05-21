import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Post,
  Body,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { UserGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { JWTService } from 'src/common/jwt/jwt.service';
import { ProfileDTO, Survey } from 'src/common/datatype/dto/user.dto';
import { UserEntityToDTO } from './user.pipe';
import { MessageResponse } from 'src/common/datatype/dto/response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(UserGuard)
@Controller('user')
@UseInterceptors(FileInterceptor('no-file'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
  ) {}

  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Return user profile',
    type: ProfileDTO,
  })
  @ApiResponse({
    status: 403,
    description: 'User not found',
  })
  async getProfile(@Headers() headers: any): Promise<ProfileDTO> {
    const userId = (await this.jwtService.getPayloadFromHeader(headers))
      .userid;
    const user = await this.userService.findUser(userId);
    return new UserEntityToDTO().transform(user);
  }

  @Post('survey')
  @ApiResponse({
    status: 200,
    description: 'Return survey added',
    type: MessageResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Survey already exists or missing information',
  })
  async updateSurvey(
    @Headers() headers: any,
    @Body() surveyInput: Survey,
  ): Promise<MessageResponse> {
    const userId = (await this.jwtService.getPayloadFromHeader(headers))
      .userid;
    const status = await this.userService.updateSurvey(
      userId,
      surveyInput,
    );
    if (!status) {
      throw new ForbiddenException('Survey update failed');
    }
    return { message: 'Survey updated successfully' };
  }
}
