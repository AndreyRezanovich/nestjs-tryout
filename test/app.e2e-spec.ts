// import { Test } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { TodoService } from '../src/todo/todo.service';
// import { TodoController } from '../src/todo/todo.controller';
//
// describe('TodoController (e2e)', () => {
//   let app: INestApplication;
//   const mockedTodosService = { getTodos: () => ['test'] };
//   // let todoService: TodoService;
//
//   beforeAll(async () => {
//     const module = await Test.createTestingModule({
//       imports: [],
//       controllers: [TodoController],
//       providers: [
//         TodoService,
//       ]
//     })
//       .overrideProvider(TodoService)
//       .useValue(mockedTodosService)
//       .compile();
//
//
//     // todoService = module.get<TodoService>(TodoService);
//     app = module.createNestApplication();
//     await app.init();
//   });
//
//   test('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/todos')
//       .expect(404)
//       .expect(['test']);
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
// });
