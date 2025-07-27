using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MeterSystem.Infrastructure.Data
{
    public class MeterSystemDbContext : DbContext
    {

        public MeterSystemDbContext(DbContextOptions<MeterSystemDbContext> options) : base(options)
        {
        }
    }
}
