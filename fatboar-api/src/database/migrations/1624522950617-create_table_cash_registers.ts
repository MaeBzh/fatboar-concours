import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class createTableCashRegisters1624522950617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cashRegisters",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "serial",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "token",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.addColumn("cashRegisters", new TableColumn({
            name: "restaurantId",
            type: "int"
        }));

        await queryRunner.createForeignKey("cashRegisters", new TableForeignKey({
            columnNames: ["restaurantId"],
            referencedColumnNames: ["id"],
            referencedTableName: "restaurants",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cashRegisters");
    }

}
