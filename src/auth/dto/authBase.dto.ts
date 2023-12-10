import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthBaseDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
