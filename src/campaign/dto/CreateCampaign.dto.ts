import { IsNotEmpty, IsDateString, IsInt } from "class-validator";

export class CreateCampaignDto {

  @IsNotEmpty({message: "Name can't be empty"})
  name: string;

  @IsNotEmpty({message: "Start date can't be empty"})
  @IsDateString()
  startDate: Date;

  @IsNotEmpty({message: "End date can't be empty"})
  @IsDateString()
  endDate: Date;

  @IsNotEmpty({message: "Per day limitame can't be empty"})
  @IsInt()
  perDayLimit: number;

  @IsNotEmpty({message: "Total limit can't be empty"})
  @IsInt()
  totalLimit: number;
}