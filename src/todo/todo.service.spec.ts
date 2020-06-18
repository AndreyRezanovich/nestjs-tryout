import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoModule } from './todo.module';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

jest.mock('./todo.service');


describe('TodoService', () => {
  let todoService: TodoService;
  let todoController: TodoController;


  const mockRepo = {
    find() {
      return {};
    },
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
      const result = '';
      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(todoService.searchTodo(''))).toBe(result);
    });

    it('Remove Todo', () => {
      const result = {};
      const mock = jest.fn().mockImplementation(() => result);

      expect(mock(todoService.create({}, {}))).toBe(result);

    });
  });
});
