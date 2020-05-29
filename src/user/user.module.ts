import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
// import { ConnectionModule } from '../sse/connection.module';
// import { ConnectionController } from '../sse/connection.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '600s' },
    }),
    ConfigModule,
    // ConnectionModule],
    ],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {
}
