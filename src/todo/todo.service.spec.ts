import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoModule } from './todo.module';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

// import * as TodoModule from './todo.module';


describe('TodoService', () => {
  let todoService: TodoService;
  let todoController: TodoController;


  // const mockTodoModel = jest.fn();
  // jest.mock('TodoModule', () => {
  //   return jest.fn().mockImplementation(() => {
  //     return {todoModel: mockTodoModel}
  //   })
  // });

  const mockRepo = {
    find() {
      return {}
    }
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TodoModule],
    }).overrideProvider(getModelToken('Todo'))
      .useValue(mockRepo)
      .compile();

    todoService = module.get<TodoService>(TodoService);
    todoController = module.get<TodoController>(TodoController);
  });

  describe('Todo Service', () => {
    it('Search Todo', () => {
      const result = {};
      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(todoService.searchTodo({}))).toBe(result);

      // jest.spyOn(todoController, 'findTodo').mockImplementation(() => result);
      // expect(todoService.searchTodo({})).toBe(result);
    });

    it('Remove Todo', () => {
      jest.mock('TodoModule');
      const result = {};
      const mock = jest.fn().mockImplementation(() => result);

      expect(mock(todoService.create({}, {}))).toBe(result);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // jest.spyOn(todoController, 'createTodo').mockImplementation();
      // expect(todoService.create({}, {})).toBe(result);
    })
  })
});
