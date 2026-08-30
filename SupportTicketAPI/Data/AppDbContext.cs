using Microsoft.EntityFrameworkCore;
using SupportTicketAPI.Models;
using System.Collections.Generic;

namespace SupportTicketAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
    }
}