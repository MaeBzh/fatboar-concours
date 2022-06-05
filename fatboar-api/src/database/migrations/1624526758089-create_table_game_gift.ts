import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createTableGameGift1624526758089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gameGift",
        columns: [
          {
            name: "gameId",
            type: "int",
          },
          {
            name: "giftId",
            type: "int",
          },
          {
            name: "winPercentage",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "gameGift",
      new TableForeignKey({
        columnNames: ["gameId"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "gameGift",
      new TableForeignKey({
        columnNames: ["giftId"],
        referencedColumnNames: ["id"],
        referencedTableName: "gifts",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gameGift");
  }
}
