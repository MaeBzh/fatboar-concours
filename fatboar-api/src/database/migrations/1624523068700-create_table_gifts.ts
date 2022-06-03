import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableGifts1624523068700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gifts",
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
          },
          {
            name: "photo",
            type: "varchar",
          },
          {
            name: "filename",
            type: "varchar",
          },
          {
            name: "icon",
            type: "varchar",
          },
          {
            name: "isJackpot",
            type: "boolean",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gifts");
  }
}
