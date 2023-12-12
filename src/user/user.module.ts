import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserFactory } from './user.factory';

@Module({
  controllers: [UserController],
  providers: [UserService, UserFactory],
})
export class UserModule {}
