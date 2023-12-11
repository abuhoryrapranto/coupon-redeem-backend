import { Body, Controller, HttpCode, Post, UseInterceptors, UsePipes, ValidationPipe, Version } from '@nestjs/common';
import { CreateCampaignDto } from './dto/CreateCampaign.dto';
import { CampaignService } from './campaign.service';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';
import { AttachRewardDto } from './dto/AttachReward.dto';

@Controller({ path: 'campaign', version: '1'})
@UseInterceptors(TransformInterceptor)
export class CampaignController {

  constructor(private campaignService: CampaignService) {}

  
  @Post('/create-reward')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createReward(@Body() campaignData: CreateCampaignDto)
  {
    return this.campaignService.createReward(campaignData);
  }

  @Post('/attach-reward')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async attachReward(@Body() attachRewardData: AttachRewardDto)
  {
    return this.campaignService.attachReward(attachRewardData);
  }
}
