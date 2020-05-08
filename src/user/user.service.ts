import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from '../models/user.interface';
import { UserDto } from '../dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';


@Injectable()

export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserInterface>,
    private jwtService: JwtService,
  ) {
  }

  createUser(user) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  findUsers() {
    return this.userModel.find();
  }

  async validateUser(user: UserDto): Promise<string> {
    const foundUser = await this.userModel.findOne({ login: user.login });
    if (foundUser) {
      if (user.password === foundUser.password) {
        return JSON.stringify(this.createToken(foundUser.login));
      } else {
        throw new HttpException('Wrong password please try again', 401);
      }
    } else {
      throw new HttpException('Wrong login please try again', 401);
    }
  }

  createToken(login) {
    const payload = { login };
    return this.jwtService.sign(payload);
  }

  createMail() {
    const transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: 'postmaster@sandbox8738fa8543b04e5d9a9fc7b5c597b496.mailgun.org',
        pass: '1fa78984f7aa99d95dedd6be5b6bbe88-65b08458-a1520851',
      },
    });
    const mailOptions = {
      from: 'postmaster@sandbox8738fa8543b04e5d9a9fc7b5c597b496.mailgun.org',
      to: 'anreza@pascalium.com',
      subject: 'Congrats',
      text: `Congratulations you are registered.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log('Message Sent', info);
    });
  }
}
