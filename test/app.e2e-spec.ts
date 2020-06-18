import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from '../src/todo/todo.module';
import { getModelToken } from '@nestjs/mongoose';
import { TodoController } from '../src/todo/todo.controller';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  const mockRepo = {
    find() {
      return {};
    },
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TodoModule],
      controllers: [TodoController],
    })
      .overrideProvider(getModelToken('Todo'))
      .useValue(mockRepo)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('GET /todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({});
  });


  afterAll(async () => {
    await app.close();
  });
});
