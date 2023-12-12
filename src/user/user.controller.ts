import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../decorator/';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { UserFactory } from './user.factory';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private factory: UserFactory,
  ) {}
  @Get()
  getUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async editUser(@Body() dto: EditUserDto, @Param('id') userId: string) {
    console.log(userId);

    try {
      const entity = await this.userService.editUser(parseInt(userId, 10), dto);
      const userDto = this.factory.entityToDto(entity);
      return userDto;
    } catch (error) {
      throw error;
    }
  }
}
