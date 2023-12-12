import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private logger = new Logger(UserService.name);
  async editUser(userId: number, dto: EditUserDto) {
    try {
      this.logger.log(`updating the user ${userId}`);
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });
      return user;
    } catch (error) {
      this.logger.error(`Error while updating user Error :${error}`);
      throw error;
    }
  }
}
