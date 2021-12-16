import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './HelloController';
import { HelloService } from '../service/HelloService';

describe('AppController', () => {
  let appController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    appController = app.get<HelloController>(HelloController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
