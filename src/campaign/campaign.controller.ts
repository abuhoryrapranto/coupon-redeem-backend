import { Body, Controller, HttpCode, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCampaignDto } from './dto/CreateCampaign.dto';
import { CampaignService } from './campaign.service';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';
import { AttachRewardDto } from './dto/AttachReward.dto';

@Controller('campaign')
@UseInterceptors(TransformInterceptor)
export class CampaignController {

  constructor(private campaignService: CampaignService) {}

  
  @Post('/create-reward')
  @UsePipes(ValidationPipe)
  async createReward(@Body() campaignData: CreateCampaignDto)
  {
    return this.campaignService.createReward(campaignData);
  }

  @Post('/attach-reward')
  @UsePipes(ValidationPipe)
  async attachReward(@Body() attachRewardData: AttachRewardDto)
  {
    return this.campaignService.attachReward(attachRewardData);
  }
}
