import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserDto } from '../dto/user-dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './user.decorator';


@Controller('/auth/')
export class UserController {
  constructor(
    private readonly userService: UserService,
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

  @Post('login')
  async login(@Body(ValidationPipe) user: any): Promise<string> {
    console.log(user);
    return await this.userService.validateUser(user);
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.userService.findUsers();
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt'))
  refreshToken(@CurrentUser() user) {
    return this.userService.refresh(user);
  }
}
