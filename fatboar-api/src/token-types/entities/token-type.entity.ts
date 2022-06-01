import { Token } from "../../tokens/entities/token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "tokenTypes"})
export class TokenType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Token, token => token.tokenType)
    tokens: Promise<Token[]>;    
}
