import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto';
import { Response } from 'express';
import { BaseResponseVo, UserGuard } from 'src/core';
import { AuthTokenVo } from './vo/auth-token.vo';
import { User } from '../user/user.entity';
import { UserInfo } from '../../common';

@Controller('auth')
@ApiTags('AUTH')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인
   * @param authLoginDto
   * @param response
   * @returns AuthTokenVo
   */
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  public async login(
    @Body() authLoginDto: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<BaseResponseVo<AuthTokenVo>> {
    const authVo = await this.authService.login(authLoginDto);
    // refresh token 쿠키에 설정
    if (authVo) response.cookie('refresh-token', authVo.refreshToken);
    return new BaseResponseVo<AuthTokenVo>(authVo);
  }

  /**
   * 로그아웃
   * @param user
   * @returns boolean
   */
  @UseGuards(new UserGuard(true))
  @Post('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  public async logout(
    @UserInfo() user: User,
  ): Promise<BaseResponseVo<boolean>> {
    console.log(user, 'user');
    return new BaseResponseVo<boolean>(await this.authService.logout(user.id));
  }
}
