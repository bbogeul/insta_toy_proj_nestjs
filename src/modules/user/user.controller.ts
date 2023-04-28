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
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserFindOneVo } from './vo';
import { UserCreateDto } from './dto';

@Controller('user')
@ApiTags('USER')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id([0-9]+)')
  @HttpCode(HttpStatus.OK)
  public async findOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserFindOneVo> {
    return await this.userService.findOne(id);
  }

  // POST ENDPOINTS

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  public async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }
}
