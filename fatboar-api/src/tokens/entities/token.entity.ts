import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TokenType } from "../../token-types/entities/token-type.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: "tokens" })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  isRevoked: boolean;

  @Column()
  expiresIn: Date;

  @ManyToOne((type) => TokenType, (tokenType) => tokenType.tokens)
  tokenType: TokenType;

  @ManyToOne((type) => User, (user) => user.tokens)
  user: User;
}
