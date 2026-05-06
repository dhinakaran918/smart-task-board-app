using Microsoft.EntityFrameworkCore;
using taskbordapi.Models;
using taskbordapi.Models.TaskBoardAPI.Models;

namespace TaskBoardAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; }
    }
}