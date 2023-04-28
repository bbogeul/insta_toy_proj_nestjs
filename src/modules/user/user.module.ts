import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserRepository, UserService],
  exports: [],
})
export class UserModule {}
