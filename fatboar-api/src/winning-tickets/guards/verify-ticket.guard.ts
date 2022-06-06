import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { RequestWithUser } from "../../authentication/interfaces/request-with-user.interface";

@Injectable()
export class VerifyTicketGuard extends ThrottlerGuard {
    protected handleRequest(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
        const req = context.switchToHttp().getRequest<RequestWithUser>();
        return Promise.resolve(req.user.role.name === "client");
    }
}
