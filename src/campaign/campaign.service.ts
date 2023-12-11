import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reward } from 'src/entities/Reward';
import { CreateCampaignDto } from './dto/CreateCampaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachRewardDto } from './dto/AttachReward.dto';
import { Coupon } from 'src/entities/Coupon';

@Injectable()
export class CampaignService {

  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async createReward(campaignData: CreateCampaignDto): Promise<Reward>
  {
    try {

      const reward = new Reward();
      reward.name = campaignData.name;
      reward.startDate = campaignData.startDate;
      reward.endDate = campaignData.endDate;
      reward.perDayLimit = campaignData.perDayLimit;
      reward.totalLimit = campaignData.totalLimit;

      const save = this.rewardRepository.save(reward);
      return save;

    } catch(error) {
      throw new HttpException(
        'Bad Request',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async attachReward(attachRewardData: AttachRewardDto): Promise<Coupon>
  {
    const id : any  = attachRewardData.rewardId;
    
    const reward = await this.rewardRepository.findOne({where: {id: id}});

    if(!reward) throw new HttpException('Invalid reward id', HttpStatus.BAD_REQUEST);

    try {

      const coupon = new Coupon();
      coupon.value = attachRewardData.value;
      coupon.Reward = attachRewardData.rewardId;
      const save = this.couponRepository.save(coupon);
      return save;

    } catch(error) {

      throw new HttpException(
        'Bad Request',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getAllRewards() : Promise<Reward[]>
  {
    const rewards = this.rewardRepository.find();

    if(!rewards)  throw new HttpException('No rewards found.', HttpStatus.NOT_FOUND);

    return rewards;
  }
}
