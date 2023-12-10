import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/Player';
import { PlayerCoupon } from 'src/entities/PlayerCoupon';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { RedeemCouponDto } from './dto/RedeemCoupon.dto';
import { Coupon } from 'src/entities/Coupon';
import { Reward } from 'src/entities/Reward';

@Injectable()
export class CouponService {

  constructor(
    @InjectRepository(Player)
    private palyerRepository: Repository<Player>,
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    @InjectRepository(PlayerCoupon)
    private playerCouponRepository: Repository<PlayerCoupon>,
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async redeemCoupon(redeemCouponData: RedeemCouponDto)
  {

    //check valid player id
    const playerId : any  = redeemCouponData.playerId;

    const player = this.palyerRepository.findOne({where: {id: playerId}});

    if(!player) throw new HttpException('Invalid player id', HttpStatus.BAD_REQUEST);

    //check valid reward id
    const rewardId : any  = redeemCouponData.rewardId;

    const reward = await this.rewardRepository.findOne({where: {id: rewardId}});

    if(!reward) throw new HttpException('Invalid reward id', HttpStatus.BAD_REQUEST);


    const currentDate : string = new Date().toISOString().split("T")[0];
    const startDate : string = reward.startDate.toISOString().split("T")[0];
    const endDate : string = reward.endDate.toISOString().split("T")[0];

    //check reward dates
    if(currentDate < startDate  && currentDate > endDate) throw new HttpException('Reward date is over', HttpStatus.BAD_REQUEST);

    //check daily redeemed coupon
    const dailyPlayerCouponCount : number = await this.playerCouponRepository.createQueryBuilder()
                                                                    .where("id = :id", {id: playerId})
                                                                    .where("DATE(redeemedAt) = :date", { date: new Date().toISOString().split("T")[0] })
                                                                    .getCount();

    if(dailyPlayerCouponCount > 3) throw new HttpException('Already exceeds the daily  limit', HttpStatus.BAD_REQUEST);

    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
    
    const weeklyPlayerCouponCount : number = await this.playerCouponRepository.createQueryBuilder()
                                                                    .where("id = :id", {id: playerId})
                                                                    .where("DATE(redeemedAt) >= :startDate AND DATE(redeemedAt) <= :endDate", { startDate: sevenDaysAgo, endDate: new Date().toISOString().split("T")[0] })
                                                                    .getCount();
    //check daily redeemed coupon
    if(weeklyPlayerCouponCount > 21) throw new HttpException('Already exceeds the weekly limit', HttpStatus.BAD_REQUEST);

    const coupons = await this.couponRepository.createQueryBuilder()
                                                .where('rewardId = :rewardId', {rewardId: rewardId})
                                                .getMany();

    let couponId : number = 0;
    let value : string = null;

    for(const coupon of coupons) {

      const exist = await this.playerCouponRepository.createQueryBuilder()
                                                    .where('couponId = :couponId', {couponId: coupon.id})
                                                    .getOne();

      if(exist) {

        continue;

      } else {

        couponId = coupon.id;
        value = coupon.value;
        break;

      }
    }

    if(couponId == 0) throw new HttpException('No coupons available for this reward.', HttpStatus.BAD_REQUEST);

    try {

      const data : any = {
        redeemedAt: new Date(),
        player: playerId,
        coupon: couponId
      }
      const savedData = await this.playerCouponRepository
                                  .createQueryBuilder()
                                  .insert()
                                  .into(PlayerCoupon)
                                  .values(data)
                                  .execute();
      return 'ok';

    } catch(error) {

      throw new HttpException(
        'Bad Request',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
