import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBaseDto } from './authBase.dto';

export class AuthDto extends AuthBaseDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
