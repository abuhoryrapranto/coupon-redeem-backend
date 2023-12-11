import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from './campaign.controller';

describe('CampaignController', () => {
  let controller: CampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
  });

  describe('getAllRewards', () => {
    it('should return status code 200', () => {
      controller.getAllRewards();
      expect(200);
    });
  })
});
