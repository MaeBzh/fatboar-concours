import { classToPlain } from 'class-transformer';
import { CashRegister } from './../../cash-registers/entities/cash-register.entity';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

export interface RequestWithUser extends Request {
    user: User;
}

export interface RequestWithCashRegister extends Request {
    cashRegister: CashRegister;
}