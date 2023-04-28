import { USER_STATUS } from 'src/common';
import { User } from '../user.entity';

export class UserFindOneVo implements Partial<User> {
  username: string;
  email: string;
  status: USER_STATUS;
}
