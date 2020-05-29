import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from '../models/todo.model';
// import { ConnectionController } from '../sse/connection.controller';
import { SSEMiddleware } from '../sse/sse-middleware';
// import { ConnectionModule } from '../sse/connection.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})

export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SSEMiddleware)
      .forRoutes(TodoController);
  }

}
