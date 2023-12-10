import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactory } from './auth.factory';
@Module({
  providers: [AuthService, AuthFactory],
  controllers: [AuthController],
})
export class AuthModule {}
