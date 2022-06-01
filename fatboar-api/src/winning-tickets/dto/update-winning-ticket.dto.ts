import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";
import { CashRegister } from "./../../cash-registers/entities/cash-register.entity";
import { User } from "./../../users/entities/user.entity";
import { CreateWinningTicketDto } from "./create-winning-ticket.dto";

export class UpdateWinningTicketDto extends PartialType(
  CreateWinningTicketDto
) {
  @ApiProperty()
  @IsDate()
  assignedOn?: Date;

  @ApiProperty()
  user?: User;

  @ApiProperty()
  @IsNumber()
  amount?: number;

  @ApiProperty()
  cashRegister?: CashRegister;
}
