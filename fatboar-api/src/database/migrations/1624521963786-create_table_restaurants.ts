import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createTableRestaurants1624521963786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "restaurants",
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
                    name: "city",
                    type: "varchar"
                }       
            ]
        }), true);
    }       

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("restaurants");
    }

}
