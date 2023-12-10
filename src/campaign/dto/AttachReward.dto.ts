import { IsNotEmpty, IsInt } from "class-validator";
import { Reward } from "src/entities/Reward";

export class AttachRewardDto {

  @IsNotEmpty({message: "Reward id can't be empty"})
  rewardId: Reward;

  @IsNotEmpty({message: "Value can't be empty"})
  value: string;
}