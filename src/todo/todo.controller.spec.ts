import { Test } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoModule } from './todo.module';
import { getModelToken } from '@nestjs/mongoose';


describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  const mockRepository = {
    find() {
      return {};
    }
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(getModelToken('Todo'))
      .useValue(mockRepository)
      .compile();

    todoService = moduleRef.get<TodoService>(TodoService);
    todoController = moduleRef.get<TodoController>(TodoController);
  });

  describe('Todo', () => {
    it(' Get Todo', async () => {
      const result = {id: '123'};

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(todoService, 'findTodoById').mockImplementation(() => result);
      expect(await todoController.getTodo('123')).toBe(result);
    });

    it('Search Todo', async () => {
      const result = '';


      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(todoService, 'searchTodo').mockImplementation(() => result);
      expect(await todoController.findTodo('')).toBe(result);
    });
  });
});
