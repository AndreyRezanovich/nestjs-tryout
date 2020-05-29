import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import { ConnectionModule } from './sse/connection.module';
import { SSEMiddleware } from 'nestjs-sse';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todosdb', { useFindAndModify: false }),
    TodoModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ConnectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SSEMiddleware)
      .forRoutes(AppController);
  }
}

