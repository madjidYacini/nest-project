import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtSign } from '../../interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger(JwtStrategy.name);
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: IJwtSign) {
    try {
      this.logger.log(`Find user with id : ${payload.sub} `);
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });

      return user;
    } catch (error) {
      this.logger.error(`Error fetching user`);
      throw Error;
    }
  }
}
