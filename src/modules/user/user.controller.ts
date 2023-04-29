import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserFindOneVo } from './vo';
import { UserCreateDto } from './dto';
import { BaseResponseVo } from 'src/core';

@Controller('user')
@ApiTags('USER')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 아이이디로 상세 호출
   * @param id
   * @returns
   */
  @Get(':id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  public async findOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponseVo<UserFindOneVo>> {
    return new BaseResponseVo<UserFindOneVo>(
      await this.userService.findOne(id),
    );
  }

  // POST ENDPOINTS

  /**
   * 새로운 사용자 생성
   * @param userCreateDto
   * @returns null
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }
}
