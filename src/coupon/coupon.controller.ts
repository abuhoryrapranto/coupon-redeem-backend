import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { RedeemCouponDto } from './dto/RedeemCoupon.dto';
import { CouponInterceptor } from 'src/common/interceptors/coupon/coupon.interceptor';

@Controller({ path: 'coupon', version: '1'})
@UseInterceptors(CouponInterceptor)
export class CouponController {

  constructor(private couponService: CouponService) {}

  @Post('/coupon-redeem')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async redeemCode(@Body() redeemCouponData : RedeemCouponDto)
  {
    return this.couponService.redeemCoupon(redeemCouponData);
  }

}
