import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthSigninDto, AuthSignupDto } from './dto';
import { AuthFactory } from './auth.factory';
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private authFactory: AuthFactory,
  ) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: AuthSignupDto): Promise<AuthSigninDto> {
    try {
      const entity = await this.authService.signup(dto);
      this.logger.verbose(`User ${dto.email} saved successfully`);
      return this.authFactory.entityToDto(entity);
    } catch (error) {
      this.logger.error(`AN error occured while creating user error: ${error}`);
      throw error;
    }
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto): Promise<AuthSigninDto> {
    try {
      const userEntity = await this.authService.signin(dto);
      this.logger.log(`User with email: ${dto.email} found`);
      return this.authFactory.entityToDto(userEntity);
    } catch (error) {
      this.logger.error(`A error occured while getting user error: ${error}`);
      throw error;
    }
  }
}
