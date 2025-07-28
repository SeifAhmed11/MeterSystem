using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterSystem.Domain.Entities
{
    public class Meter
    {
        public Guid Id { get; set; }

        public string Serial { get; set; }

        public string Type { get; set; }

        public DateTime InstalledDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        //relation with User
    }
}
