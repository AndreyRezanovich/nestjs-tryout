import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.model';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '600s' },
  })],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {
}
