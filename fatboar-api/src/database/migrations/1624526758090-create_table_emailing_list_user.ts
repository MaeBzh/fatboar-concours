import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableEmailingListUser1624526758090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "emailingListUser",
        columns: [
          {
            name: "emailingListId",
            type: "int",
          },
          {
            name: "userId",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            name: "EmailingList",
            referencedTableName: "emailingLists",
            referencedColumnNames: ["id"],
            columnNames: ["emailingListId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "User",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("emailingListUser");
  }
}
