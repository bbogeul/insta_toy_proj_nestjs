import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserFindOneVo } from './vo';

@Controller('user')
@ApiTags('USER')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id([0-9]+)')
  public async findOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserFindOneVo> {
    return await this.userService.findOne(id);
  }
}
