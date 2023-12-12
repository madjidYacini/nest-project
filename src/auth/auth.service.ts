import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, AuthSignupDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import {
  ISignTokenStrategy,
  IUser,
  IJwtSign,
  ISigninUserToken,
} from '../interfaces';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signin(dto: AuthDto) {
    try {
      const user: IUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        this.logger.error('User not found');
        throw new ForbiddenException('credentials incorrect');
      }

      const verifyPassword = await argon.verify(user.hash, `${dto.password}`);
      if (!verifyPassword) {
        this.logger.error('password not match');

        throw new ForbiddenException('credentials incorrect');
      }
      const tokenObject: ISignTokenStrategy = {
        email: user.email,
        userId: user.id,
      };
      return await this.generateUserToken(user, tokenObject);
    } catch (error) {
      throw error;
    }
  }
  async signup(dto: AuthSignupDto) {
    try {
      const hash: string = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      const tokenObject: ISignTokenStrategy = {
        email: user.email,
        userId: user.id,
      };
      return await this.generateUserToken(user, tokenObject);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(tokenObject: ISignTokenStrategy): Promise<string> {
    try {
      this.logger.log(`Generate token to user with id ${tokenObject.userId}`);

      const payload: IJwtSign = {
        sub: tokenObject.userId,
        email: tokenObject.email,
      };
      return this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      this.logger.error(`Error while generating token Error: ${error}`);
      throw error;
    }
  }

  private async generateUserToken(
    user: IUser,
    tokenObject: ISignTokenStrategy,
  ): Promise<ISigninUserToken> {
    const token: string = await this.signToken(tokenObject);
    const userWithToken: ISigninUserToken = {
      token,
      ...user,
    };
    return userWithToken;
  }
}
