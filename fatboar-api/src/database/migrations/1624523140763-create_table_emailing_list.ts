import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableEmailingList1624523140763
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "emailingLists",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "filters",
            type: "longtext",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("emailingLists");
  }
}
