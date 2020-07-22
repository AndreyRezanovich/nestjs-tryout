import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtUtilities } from '../utilities/jwt-util';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secret',
        signOptions: { expiresIn: '2400s' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtUtilities,
  ],
  exports: [UserService],
})

export class UserModule {
}
