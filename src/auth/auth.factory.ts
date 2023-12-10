import { Injectable } from '@nestjs/common';
import { AuthSigninDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthFactory {
  constructor() {}

  public entityToDto(user: User): AuthSigninDto {
    const authDto = new AuthSigninDto();
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
