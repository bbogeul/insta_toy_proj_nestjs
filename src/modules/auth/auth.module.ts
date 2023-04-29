import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { HashService } from './hash.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ENVIRONMENT, JwtConfigService } from 'src/config';
import { CacheClusterModule } from 'src/config/cache/cache.config.module';
import { PassportModule } from '@nestjs/passport';
import { UserLoginHistoryModule } from '../user-login-history/user-login-history.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    process.env.NODE_ENV === ENVIRONMENT.PRODUCTION
      ? CacheClusterModule
      : RedisModule.forRoot({
          config: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
        }),
    UserModule,
    UserLoginHistoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [AuthController],
  providers: [HashService, JwtStrategy, AuthService],
})
export class AuthModule {}
