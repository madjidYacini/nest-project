import { IsString } from 'class-validator';
import { AuthBaseDto } from './authBase.dto';

export class AuthSigninDto extends AuthBaseDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
