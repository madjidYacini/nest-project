import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import { IUser } from '../interfaces';

@Injectable()
export class UserFactory {
  constructor() {}

  public entityToDto(user: IUser): UserDto {
    const authDto = new UserDto();
    Object.assign(authDto, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAd,
    });
    return authDto;
  }
}
