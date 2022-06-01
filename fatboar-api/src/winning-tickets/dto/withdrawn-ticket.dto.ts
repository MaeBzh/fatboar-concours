import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { CreateWinningTicketDto } from "./create-winning-ticket.dto";

export class WithdrawnTicketDto extends PartialType(CreateWinningTicketDto) {
  @ApiProperty()
  @IsDate()
  withdrawnOn?: Date;
}
