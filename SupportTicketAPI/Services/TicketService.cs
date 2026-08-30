using Microsoft.EntityFrameworkCore;
using SupportTicketAPI.Data;
using SupportTicketAPI.DTOs;
using SupportTicketAPI.Models;

namespace SupportTicketAPI.Services
{
    public class TicketService : ITicketService
    {
        private readonly AppDbContext _context;

        public TicketService(AppDbContext context)
        {
            _context = context;
        }

        // CREATE
        public async Task<Ticket> CreateTicketAsync(CreateTicketDto dto)
        {
            var ticket = new Ticket
            {
                Title = dto.Title,
                Description = dto.Description,
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                Priority = dto.Priority,
                Status = dto.Status,
                AssignedTo = dto.AssignedTo,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            _context.Tickets.Add(ticket);

            await _context.SaveChangesAsync();

            return ticket;
        }

        // GET ALL TICKETS
        public async Task<(List<Ticket> Items, int TotalItems)> GetTicketsAsync(
            string? search,
            string? status,
            string? priority,
            string? sortBy,
            string? sortOrder,
            int page,
            int pageSize)
        {
            var query = _context.Tickets.AsQueryable();

            // SEARCH
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(t =>
                    t.Title.Contains(search) ||
                    t.CustomerName.Contains(search));
            }

            // FILTER BY STATUS
            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(t => t.Status == status);
            }

            // FILTER BY PRIORITY
            if (!string.IsNullOrWhiteSpace(priority))
            {
                query = query.Where(t => t.Priority == priority);
            }

            // SORTING
            switch (sortBy?.ToLower())
            {
                case "priority":
                    query = sortOrder?.ToLower() == "asc"
                        ? query.OrderBy(t => t.Priority)
                        : query.OrderByDescending(t => t.Priority);
                    break;

                case "status":
                    query = sortOrder?.ToLower() == "asc"
                        ? query.OrderBy(t => t.Status)
                        : query.OrderByDescending(t => t.Status);
                    break;

                default:
                    query = sortOrder?.ToLower() == "asc"
                        ? query.OrderBy(t => t.CreatedDate)
                        : query.OrderByDescending(t => t.CreatedDate);
                    break;
            }

            // TOTAL ITEMS
            var totalItems = await query.CountAsync();

            // PAGINATION
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalItems);
        }

        // GET TICKET BY ID
        public async Task<Ticket?> GetTicketByIdAsync(int id)
        {
            return await _context.Tickets.FindAsync(id);
        }

        // UPDATE TICKET
        public async Task<Ticket?> UpdateTicketAsync(
            int id,
            UpdateTicketDto dto)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return null;
            }

            ticket.Title = dto.Title;
            ticket.Description = dto.Description;
            ticket.CustomerName = dto.CustomerName;
            ticket.CustomerEmail = dto.CustomerEmail;
            ticket.Priority = dto.Priority;
            ticket.Status = dto.Status;
            ticket.AssignedTo = dto.AssignedTo;
            ticket.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ticket;
        }

        // UPDATE STATUS
        public async Task<Ticket?> UpdateStatusAsync(
            int id,
            StatusUpdateDto dto)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return null;
            }

            ticket.Status = dto.Status;
            ticket.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return ticket;
        }

        // DELETE
        public async Task<bool> DeleteTicketAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return false;
            }

            _context.Tickets.Remove(ticket);

            await _context.SaveChangesAsync();

            return true;
        }

        // DASHBOARD STATISTICS
        public async Task<object> GetStatisticsAsync()
        {
            var totalTickets = await _context.Tickets.CountAsync();

            var open = await _context.Tickets
                .CountAsync(t => t.Status == "Open");

            var inProgress = await _context.Tickets
                .CountAsync(t => t.Status == "In Progress");

            var resolved = await _context.Tickets
                .CountAsync(t => t.Status == "Resolved");

            var closed = await _context.Tickets
                .CountAsync(t => t.Status == "Closed");

            var critical = await _context.Tickets
                .CountAsync(t => t.Priority == "Critical");

            return new
            {
                totalTickets,
                open,
                inProgress,
                resolved,
                closed,
                critical
            };
        }
    }
}