using Microsoft.AspNetCore.Mvc;
using SupportTicketAPI.DTOs;
using SupportTicketAPI.Services;

namespace SupportTicketAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        // GET: api/tickets
        [HttpGet]
        public async Task<IActionResult> GetTickets(
            string? search,
            string? status,
            string? priority,
            string? sortBy = "createdDate",
            string? sortOrder = "desc",
            int page = 1,
            int pageSize = 10)
        {
            // Validate pagination
            if (page < 1)
            {
                page = 1;
            }

            if (pageSize < 1 || pageSize > 100)
            {
                pageSize = 10;
            }

            var result = await _ticketService.GetTicketsAsync(
                search,
                status,
                priority,
                sortBy,
                sortOrder,
                page,
                pageSize);

            var totalPages = (int)Math.Ceiling(
                result.TotalItems / (double)pageSize);

            return Ok(new
            {
                items = result.Items,
                page,
                pageSize,
                totalItems = result.TotalItems,
                totalPages
            });
        }

        // GET: api/tickets/statistics
        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var statistics = await _ticketService.GetStatisticsAsync();

            return Ok(statistics);
        }

        // GET: api/tickets/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound(new
                {
                    message = "Ticket not found."
                });
            }

            return Ok(ticket);
        }

        // POST: api/tickets
        [HttpPost]
        public async Task<IActionResult> CreateTicket(
            CreateTicketDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Invalid ticket data.",
                    errors = ModelState
                });
            }

            var ticket = await _ticketService.CreateTicketAsync(dto);

            return CreatedAtAction(
                nameof(GetTicket),
                new { id = ticket.Id },
                ticket);
        }

        // PUT: api/tickets/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(
            int id,
            UpdateTicketDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Invalid ticket data.",
                    errors = ModelState
                });
            }

            var ticket = await _ticketService.UpdateTicketAsync(
                id,
                dto);

            if (ticket == null)
            {
                return NotFound(new
                {
                    message = "Ticket not found."
                });
            }

            return Ok(ticket);
        }

        // PATCH: api/tickets/{id}/status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(
            int id,
            StatusUpdateDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    message = "Status is required.",
                    errors = ModelState
                });
            }

            var ticket = await _ticketService.UpdateStatusAsync(
                id,
                dto);

            if (ticket == null)
            {
                return NotFound(new
                {
                    message = "Ticket not found."
                });
            }

            return Ok(ticket);
        }

        // DELETE: api/tickets/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var deleted = await _ticketService.DeleteTicketAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Ticket not found."
                });
            }

            return NoContent();
        }
    }
}