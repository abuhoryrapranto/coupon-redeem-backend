import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from 'src/entities/Reward';
import { Coupon } from 'src/entities/Coupon';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService],
  imports:[
    TypeOrmModule.forFeature([Reward, Coupon])
  ],
  exports: [TypeOrmModule]
})
export class CampaignModule {}
