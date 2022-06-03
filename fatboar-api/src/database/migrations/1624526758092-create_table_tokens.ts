import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createTableTokens1624526758092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tokens",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "value",
            type: "varchar",
          },
          {
            name: "isRevoked",
            type: "boolean",
          },
          {
            name: "expiresIn",
            type: "datetime",
          },
          {
            name: "tokenTypeId",
            type: "int",
          },
          {
            name: "userId",
            type: "int",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "tokens",
      new TableForeignKey({
        columnNames: ["tokenTypeId"],
        referencedColumnNames: ["id"],
        referencedTableName: "tokenTypes",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "tokens",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tokens");
  }
}
