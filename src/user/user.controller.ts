import {
  Body,
  Controller,
  Get,
  Headers, Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UserDto } from '../dto/user-dto';
import { JwtService } from '@nestjs/jwt';

@Controller('/auth/')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('create')
  registerUser(@Body(ValidationPipe) user: UserDto) {
    const newUser = this.userService.createUser(user);
    if (newUser) {
      return this.userService.createMail();
    } else {
      return 'Failed to register';
    }
  }

  @Get()
  getUsers(@Headers('token') token) {
    try {
      this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }
    return this.userService.findUsers();
  }

  @Get('/profile')
  getUser(@Headers('authorization') token) {
    try {
      this.jwtService.verify(token);
      const decoded = this.jwtService.decode(token);
      return this.userService.findUser(decoded['login']);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Post('login')
  async login(@Body(/*ValidationPipe*/) user: UserDto): Promise<string> {
    return await this.userService.validateUser(user);
  }
}
