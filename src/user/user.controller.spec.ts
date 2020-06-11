import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { getModelToken } from '@nestjs/mongoose';


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
      const result = {};

      jest.spyOn(userService, 'validateUser').mockImplementation();
      expect(await userController.login('')).toBe(result);
    });

    it('Get Users', () => {
      const result = {};
      jest.spyOn(userService, 'refresh').mockImplementation();
      expect(userController.refreshToken('')).toBe(result);
    });
  });
});
