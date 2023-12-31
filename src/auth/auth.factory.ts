import { Injectable } from '@nestjs/common';
import { AuthSigninDto } from './dto';
import { ISigninUserToken } from '../interfaces';

@Injectable()
export class AuthFactory {
  constructor() {}

  public entityToDto(user: ISigninUserToken): AuthSigninDto {
    const authDto = new AuthSigninDto();
    Object.assign(authDto, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAd,
      token: user.token,
    });
    return authDto;
  }
}
