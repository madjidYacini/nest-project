import { IsString } from 'class-validator';
import { EditUserDto } from '.';

export class UserDto extends EditUserDto {
  @IsString()
  updatedAt: string;

  @IsString()
  createdAt: string;
}
