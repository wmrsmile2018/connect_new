import { Test, TestingModule } from '@nestjs/testing';
import { SessionInfoController } from './session-info.controller';

describe('SessionInfoController', () => {
  let controller: SessionInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionInfoController],
    }).compile();

    controller = module.get<SessionInfoController>(SessionInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
