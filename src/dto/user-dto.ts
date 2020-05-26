import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(2, { message: 'Login is too short' })
  @MaxLength(20, { message: 'Login is too long' })
  login: string;
  @IsNotEmpty()
  @MinLength(4, { message: 'Password is too short' })
  @MaxLength(15, { message: 'Password is too long' })
  password: string;
}
