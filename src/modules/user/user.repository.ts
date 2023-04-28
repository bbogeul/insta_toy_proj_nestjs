import { Inject, Injectable } from '@nestjs/common';
import { DB_CONST_REPOSITORY } from 'src/config';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserFindOneVo } from './vo';
import { dataSource } from '../../config';
import { UserCreateDto } from './dto';
import { UserHistory } from '../user-history/user-history.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DB_CONST_REPOSITORY.USER)
    private readonly userRepository: Repository<User>,
  ) {}

  // SELECTS

  /**
   * 아이디로 찾기
   * @param id
   * @returns UserFindOneVo
   */
  public async findOneUser(id: number): Promise<UserFindOneVo> {
    // transaction 예시
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.username',
        'user.email',
        'user.nickname',
        'user.followingCount',
        'user.feedCount',
        'user.followerCount',
        'user.bio',
        'user.profileImage',
        'user.status',
      ])
      .where('user.id = :id', { id: id })
      .getOne();

    return user;
  }

  /**
   * 이메일로 존재하는지 확인
   * @param email
   * @returns User
   */
  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user.email')
      .where('user.email = :email', { email: email })
      .getOne();

    return user;
  }

  /**
   * 사용자명으로 존재하는지 확인
   * @param nickname
   * @returns User
   */
  public async findUserByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user.nickname')
      .where('user.nickname = :nickname', { nickname: nickname })
      .getOne();

    return user;
  }

  // INSERTS

  /**
   * 사용자 생성
   * @param userCreateDto
   * @returns User
   */
  public async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const user = await dataSource.transaction(async (transaction) => {
      let newUser = new User(userCreateDto);
      console.log(newUser);
      newUser = await transaction.save(newUser);
      const userHistory = new UserHistory().set(newUser);
      userHistory.userId = newUser.id;
      await transaction.save(userHistory);

      return newUser;
    });

    return user;
  }
}
