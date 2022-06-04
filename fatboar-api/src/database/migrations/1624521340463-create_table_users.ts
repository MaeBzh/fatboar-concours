import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class createTableUsersMigration1624521340463
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "firstname",
            type: "varchar",
          },
          {
            name: "lastname",
            type: "varchar",
          },
          {
            name: "birthYear",
            type: "int",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "newsletter",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "sms",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "zipcode",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "rgpdConsent",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "isActive",
            type: "boolean",
            default: false,
          },
          {
            name: "accountToken",
            type: "varchar",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "roleId",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "RESTRICT",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
