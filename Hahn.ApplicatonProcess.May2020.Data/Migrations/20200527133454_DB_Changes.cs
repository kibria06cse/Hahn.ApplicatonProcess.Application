using Microsoft.EntityFrameworkCore.Migrations;

namespace Hahn.ApplicatonProcess.May2020.Data.Migrations
{
    public partial class DB_Changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Applicants",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Applicants",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Applicants",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Applicants");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Applicants",
                newName: "ID");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Applicants",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
