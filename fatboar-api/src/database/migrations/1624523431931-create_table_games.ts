import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createTableGames1624523431931 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "games",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "startsOn",
                    type: "datetime"
                },
                {
                    name: "endsOn",
                    type: "datetime"
                },
                {
                    name: "activated",
                    type: "boolean",
                    default: false
                },
                {
                    name: "jackpotDraw",
                    type: "datetime",
                    isNullable: true
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "gameRules",
                    type: "varchar"
                },
                {
                    name: "filename",
                    type: "varchar"
                },
                {
                    name: "rulesValidation",
                    type: "datetime",
                    isNullable: true
                }                   
            ]
        }), true);   
        
        await queryRunner.addColumn("games", new TableColumn({
            name: "jackpotGiftId",
            type: "int"
        }));

        await queryRunner.createForeignKey("games", new TableForeignKey({
            columnNames: ["jackpotGiftId"],
            referencedColumnNames: ["id"],
            referencedTableName: "gifts",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("games");
    }
}
