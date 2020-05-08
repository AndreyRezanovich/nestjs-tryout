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
    console.log(process.env.MAIL_USER, '<-- MAIL');
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_DRIVER,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.MAIL_FROM,
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
