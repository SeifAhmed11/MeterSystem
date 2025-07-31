using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MeterSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addIsDeleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Recharges",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Meters",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "customers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "contracts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Consumptions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Recharges");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Meters");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "customers");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "contracts");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Consumptions");
        }
    }
}
