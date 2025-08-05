using System.Drawing;
using MeterSystem.Common.Interfaces.IServices;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace MeterSystem.Core.Services
{
    public class ExcelServices : IExcelServices
    {
        public byte[] GenerateExcel<T>(List<T> data, string sheetName = "Sheet1") where T : class
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add(sheetName);

            var properties = typeof(T).GetProperties();

            // Header
            for (int i = 0; i < properties.Length; i++)
            {
                var cell = worksheet.Cells[1, i + 1];
                cell.Value = properties[i].Name;
                cell.Style.Font.Bold = true;
                cell.Style.Font.Size = 12;
                cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                cell.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(52, 152, 219));
                cell.Style.Font.Color.SetColor(Color.White);
                cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                cell.Style.Border.BorderAround(ExcelBorderStyle.Thin);
            }

            // Data
            for (int row = 0; row < data.Count; row++)
            {
                var item = data[row];
                for (int col = 0; col < properties.Length; col++)
                {
                    var property = properties[col];
                    var value = property.GetValue(item);
                    var cell = worksheet.Cells[row + 2, col + 1];

                    if (property.PropertyType == typeof(DateTime?) || property.PropertyType == typeof(DateTime))
                    {
                        if (value != null)
                        {
                            cell.Value = ((DateTime)value).ToString("yyyy/MM/dd"); 
                        }
                        else
                        {
                            cell.Value = ""; 
                        }
                    }
                    else
                    {
                        cell.Value = value;
                    }

                    cell.Style.Font.Size = 11;
                    cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    cell.Style.Border.BorderAround(ExcelBorderStyle.Hair);

                    if ((row + 2) % 2 == 0)
                    {
                        cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        cell.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(240, 240, 240));
                    }
                }
            }

            worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

            using (var range = worksheet.Cells[1, 1, data.Count + 1, properties.Length])
            {
                range.Style.Border.Top.Style = ExcelBorderStyle.Medium;
                range.Style.Border.Left.Style = ExcelBorderStyle.Medium;
                range.Style.Border.Right.Style = ExcelBorderStyle.Medium;
                range.Style.Border.Bottom.Style = ExcelBorderStyle.Medium;
            }

            return package.GetAsByteArray();
        }

    }
}
