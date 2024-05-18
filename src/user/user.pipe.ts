import { Injectable, PipeTransform } from '@nestjs/common';
import { ProfileDTO } from 'src/common/datatype/dto/user.dto';
import { User } from 'src/common/datatype/entity/user.entity';

@Injectable()
export class UserEntityToDTO implements PipeTransform {
  transform(value: User): ProfileDTO {
    return {
      username: value.username,
      email: value.email,
      survey: value.survey,
    };
  }
}
