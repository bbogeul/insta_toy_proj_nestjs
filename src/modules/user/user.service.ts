import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFindOneVo } from './vo';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
