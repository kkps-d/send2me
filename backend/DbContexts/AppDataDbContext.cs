using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContexts
{
    public class AppDataDbContext : DbContext
    {
        public DbSet<Message> Messages { get; set; }

        public AppDataDbContext(DbContextOptions<AppDataDbContext> options) : base(options) { }
    }
}
