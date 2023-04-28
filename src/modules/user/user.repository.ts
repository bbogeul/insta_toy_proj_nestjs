import { Inject, Injectable } from '@nestjs/common';
import { DB_CONST_REPOSITORY } from 'src/config';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserFindOneVo } from './vo';
import { dataSource } from '../../config';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DB_CONST_REPOSITORY.USER)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 아이디로 찾기
   * @param id
   * @returns UserFindOneVo
   */
  public async findOneUser(id: number): Promise<UserFindOneVo> {
    const user = await dataSource.manager.transaction(async (transaction) => {
      return await this.userRepository.findOne({ where: { id: id } });
    });

    return user;
  }
}
