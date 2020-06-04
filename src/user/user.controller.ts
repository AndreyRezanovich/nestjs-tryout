import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserDto } from '../dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';


@Controller('/auth/')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  @Post('create')
  registerUser(@Body(ValidationPipe) user: UserDto) {
    const newUser = this.userService.createUser(user);
    if (newUser) {
      return this.userService.createMail();
    }
    return 'Failed to register';
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('login')
  async login(@Body(ValidationPipe) user: UserDto): Promise<string> {
    return await this.userService.validateUser(user);
  }
}
