import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactory } from './auth.factory';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthFactory, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
