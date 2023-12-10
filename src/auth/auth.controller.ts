import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthSigninDto, AuthSignupDto } from './dto';
import { AuthFactory } from './auth.factory';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authFactory: AuthFactory,
  ) {}
  @Post('signup')
  async signup(@Body() dto: AuthSignupDto) {
    console.log(dto);

    const entity = await this.authService.signup(dto);
    return this.authFactory.entityToDto(entity);
  }
  @Post('signin')
  async signin(@Body() dto: AuthDto): Promise<AuthSigninDto> {
    const userEntity = await this.authService.signin(dto);
    return this.authFactory.entityToDto(userEntity);
  }
}
