using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterSystem.Domain.Entities
{
    public class Consumption
    {
        public Guid Id { get; set; }

        public DateTime ReadingDate { get; set; }

        public decimal PreviousReading { get; set; }

        public decimal CurrentReading { get; set; }

        public decimal ConsumptionUnits { get; set; }

        //relation with User

        //relation with meter
    }
}
