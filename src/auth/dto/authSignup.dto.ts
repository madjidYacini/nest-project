import { IsOptional, IsString } from 'class-validator';
import { AuthDto } from '.';

export class AuthSignupDto extends AuthDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
