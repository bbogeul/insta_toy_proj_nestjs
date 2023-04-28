import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFindOneVo } from './vo';
import { UserCreateDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // GET SERVICES

  /**
   *
   * @param id
   * @returns UserFindOneVo
   */
  public async findOne(id: number): Promise<UserFindOneVo> {
    const user = await this.userRepository.findOneUser(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  // INSERT SERVICES

  public async createUser(userCreateDto: UserCreateDto) {
    const checkEmail = await this.userRepository.findUserByEmail(
      userCreateDto.email,
    );
    if (checkEmail) throw new BadRequestException();
    await this.userRepository.createUser(userCreateDto);
  }
}
