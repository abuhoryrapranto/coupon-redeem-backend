import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CouponModule } from 'src/coupon/coupon.module';

describe('CouponController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CouponModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Redeem Coupon for new player POST /api/v1/coupon/coupon-redeem', () => {

    const url = '/api/v1/coupon/coupon-redeem';

    it('should redeem a coupon', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          playedId: 1,
          rewardId: 1
        })
        .expect(200)
    });

    it('invalid player id', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          playedId: 150000,
          rewardId: 4
        })
        .expect(400)
    });

    it('invalid reward date', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          playedId: 1,
          rewardId: 1500000
        })
        .expect(400)
    });

    it('exceeds daily limit', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          playedId: 1,
          rewardId: 1
        })
        .expect(400)
    });

    it('exceeds weekly limit', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          playedId: 1,
          rewardId: 1
        })
        .expect(400)
    });

    it('unique coupon', () => {
      return request(app.getHttpServer())
        .post(url)
        .send({
          playedId: 1,
          rewardId: 1
        })
        .expect(400)
    });
  })
});
