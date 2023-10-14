using DOPAgent.Model;
using Microsoft.EntityFrameworkCore;

namespace DOPAgent.Context
{
    public class KanwarContext : DbContext
    {


        public KanwarContext(DbContextOptions<KanwarContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tbl_RDUsers>()
           .HasKey(e => e.Id); // Define 'Id' as the primary key
            // Other entity configurations...
        }


        public DbSet<Tbl_RDUsers> Tbl_RDUsers { get; set; }
        public DbSet<LoginUser> loginuser { get; set; }

    }
}
