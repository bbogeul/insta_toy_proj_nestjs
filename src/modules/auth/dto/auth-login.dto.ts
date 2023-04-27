import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, MinLength } from 'class-validator';
import { IsPassword } from 'src/common';

export class AuthLoginDto {
  // 이메일일 수 있고 아닐 수도 있음
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPassword()
  password: string;
}
