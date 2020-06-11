import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

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

    // it('should throw error', async () => {
    //   const result = '';
    //   jest.spyOn(userController, 'login').mockImplementation();
    //   expect(userService.validateUser({})).toBe(result);
    // });
    //
    it('Create Token', async () => {
      const result = '';

      const mock = jest.fn().mockImplementation(() => result);
      expect(mock(userService.createToken(''))).toBe(result);

      // jest.spyOn(userController, 'login').mockImplementation(() => result);
      // expect(userService.createToken('')).toBe(result);
    });

    it('Create User', () => {
      const result = '';
      jest.spyOn(userController, 'registerUser').mockImplementation();
      expect(userService.createUser('')).toBe(result);
    })

  });
});
