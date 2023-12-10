import { Body, Controller, Get, Post } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { RedeemCouponDto } from './dto/RedeemCoupon.dto';

@Controller('coupon')
export class CouponController {

  constructor(private couponService: CouponService) {}

  @Post('/test')
  async test(@Body() redeemCouponData : RedeemCouponDto)
  {
    return this.couponService.redeemCoupon(redeemCouponData);
  }

}
