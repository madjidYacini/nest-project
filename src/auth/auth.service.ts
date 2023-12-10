import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthSignupDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService) {}
  async signin(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
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

      return user;
    } catch (error) {
      throw error;
    }
  }
  async signup(dto: AuthSignupDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
