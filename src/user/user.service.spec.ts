import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('./user.service');

describe('UserService', () => {
  let userController: UserController;
  let userService: UserService;

  const mockRepo = {
    find(login: string) {
      if (login === 'testUser') {
        return { password: '123' };
      }
      return null;
    },
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getModelToken('User'))
      .useValue(mockRepo)
      .compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('User Service Test', () => {
    it('should respond token', async () => {
      const result = {};
      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(userService.validateUser({}))).toBe(result);
    });

    it('Create Token', async () => {
      const result = '';
      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(userService.createToken(''))).toBe(result);
    });

    it('Create User', () => {
      const result = {};
      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(userService.createUser({}))).toBe(result);
    })

  });
});
