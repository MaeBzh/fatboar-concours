import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createTableWinningTickets1624526066210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "winningTickets",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "number",
                    type: "bigint"
                },
                {
                    name: "withdrawnOn",
                    type: "datetime",
                    isNullable: true
                },
                {
                    name: "amount",
                    type: "float",
                    isNullable: true
                },
                {
                    name: "assignedOn",
                    type: "datetime",
                    isNullable: true
                }           
            ]
        }), true);

        await queryRunner.addColumn("winningTickets", new TableColumn({
            name: "gameId",
            type: "int"
        }));

        await queryRunner.createForeignKey("winningTickets", new TableForeignKey({
            columnNames: ["gameId"],
            referencedColumnNames: ["id"],
            referencedTableName: "games",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("winningTickets", new TableColumn({
            name: "cashRegisterId",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("winningTickets", new TableForeignKey({
            columnNames: ["cashRegisterId"],
            referencedColumnNames: ["id"],
            referencedTableName: "cashRegisters",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("winningTickets", new TableColumn({
            name: "userId",
            type: "int",
            isNullable: true
        }));

        await queryRunner.createForeignKey("winningTickets", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("winningTickets", new TableColumn({
            name: "giftId",
            type: "int"
        }));

        await queryRunner.createForeignKey("winningTickets", new TableForeignKey({
            columnNames: ["giftId"],
            referencedColumnNames: ["id"],
            referencedTableName: "gifts",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("winningTickets");
    }

}
