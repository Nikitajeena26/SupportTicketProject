using SupportTicketAPI.DTOs;
using SupportTicketAPI.Models;

namespace SupportTicketAPI.Services
{
    public interface ITicketService
    {
        Task<(List<Ticket> Items, int TotalItems)> GetTicketsAsync(
            string? search,
            string? status,
            string? priority,
            string? sortBy,
            string? sortOrder,
            int page,
            int pageSize);

        Task<Ticket?> GetTicketByIdAsync(int id);

        Task<Ticket> CreateTicketAsync(CreateTicketDto dto);

        Task<Ticket?> UpdateTicketAsync(
            int id,
            UpdateTicketDto dto);

        Task<Ticket?> UpdateStatusAsync(
            int id,
            StatusUpdateDto dto);

        Task<bool> DeleteTicketAsync(int id);

        // Dashboard Statistics
        Task<object> GetStatisticsAsync();
    }
}