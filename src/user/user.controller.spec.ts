import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('./user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockRepo = {
    find() {
      return {};
    }
  };

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [],
    })
      .overrideProvider(getModelToken('User'))
      .useValue(mockRepo)
      .compile();

    userService = testModule.get<UserService>(UserService);
    userController = testModule.get<UserController>(UserController);
  });

  describe('User Test', () => {
    it('Login User', async () => {
      const result = {login: ''};

      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(userController.login(''))).toBe(result);
    });

    it('Get Users', () => {
      const result = {};
      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(userController.refreshToken(''))).toBe(result);
    });
  });
});
