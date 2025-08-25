using iTextSharp.text;
using iTextSharp.text.pdf;
using MeterSystem.Common.Interfaces.IServices;

namespace MeterSystem.Core.Services
{
    public class PdfGeneratorService : IPdfGeneratorService
    {
        public byte[] GeneratePdf<T>(IEnumerable<T> data, string title = "Report")
        {
            using var ms = new MemoryStream();
            var document = new Document(PageSize.A4.Rotate(), 20f, 20f, 20f, 20f);
            PdfWriter.GetInstance(document, ms);
            document.Open();

            var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
            var headerFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12);
            var cellFont = FontFactory.GetFont(FontFactory.HELVETICA, 10);

            document.Add(new Paragraph(title, titleFont)
            {
                Alignment = Element.ALIGN_CENTER,
                SpacingAfter = 20f
            });

            var props = typeof(T).GetProperties();

            var table = new PdfPTable(props.Length)
            {
                WidthPercentage = 100
            };

            foreach (var prop in props)
            {
                var cell = new PdfPCell(new Phrase(prop.Name, headerFont))
                {
                    BackgroundColor = new BaseColor(230, 230, 230),
                    HorizontalAlignment = Element.ALIGN_CENTER
                };
                table.AddCell(cell);
            }

            foreach (var item in data)
            {
                foreach (var prop in props)
                {
                    object? rawValue = prop.GetValue(item);
                    string value = rawValue switch
                    {
                        DateTime dt => dt.ToString("yyyy-MM-dd"),
                        decimal d => d.ToString("F2"),
                        null => "N/A",
                        _ => rawValue.ToString()!
                    };

                    table.AddCell(new Phrase(value, cellFont));
                }
            }

            document.Add(table);
            document.Close();

            return ms.ToArray();
        }
    
    }
}
