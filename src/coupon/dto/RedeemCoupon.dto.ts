import { IsNotEmpty, IsInt } from "class-validator";
import { Player } from "src/entities/Player";
import { Reward } from "src/entities/Reward";

export class RedeemCouponDto {

  @IsNotEmpty({message: "Reward id can't be empty"})
  playerId: Player;

  @IsNotEmpty({message: "Start date can't be empty"})
  rewardId: Reward;
}