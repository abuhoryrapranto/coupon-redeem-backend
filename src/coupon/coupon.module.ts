import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/Player';
import { PlayerCoupon } from 'src/entities/PlayerCoupon';
import { Reward } from 'src/entities/Reward';
import { Coupon } from 'src/entities/Coupon';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports:[
    TypeOrmModule.forFeature([Player, PlayerCoupon, Reward, Coupon])
  ],
  exports: [TypeOrmModule]
})
export class CouponModule {}
