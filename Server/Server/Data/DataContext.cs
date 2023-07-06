

using Microsoft.EntityFrameworkCore;
//using System.Data.Entity;

namespace Server.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<Status>Status { get; set; }

    }
}
