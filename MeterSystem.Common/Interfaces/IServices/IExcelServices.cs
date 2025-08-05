using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterSystem.Common.Interfaces.IServices
{
    public interface IExcelServices
    {
        byte[] GenerateExcel<T>(List<T> data, string sheetName = "Sheet1") where T : class;
    }
}
