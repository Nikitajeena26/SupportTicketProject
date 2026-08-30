using Microsoft.EntityFrameworkCore;
using SupportTicketAPI.Data;
using SupportTicketAPI.DTOs;
using SupportTicketAPI.Services;

namespace SupportTicketAPI.Tests
{
    public class UnitTest1
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        // Test 1: Create Ticket
        [Fact]
        public async Task CreateTicketAsync_ShouldCreateTicket()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var dto = new CreateTicketDto
            {
                Title = "Test Ticket",
                Description = "Test Description",
                CustomerName = "Test Customer",
                CustomerEmail = "test@gmail.com",
                Priority = "High",
                Status = "Open",
                AssignedTo = "John Smith"
            };

            var result = await service.CreateTicketAsync(dto);

            Assert.NotNull(result);
            Assert.Equal("Test Ticket", result.Title);
            Assert.Equal("Test Customer", result.CustomerName);

            Assert.Single(context.Tickets);
        }

        // Test 2: Get Ticket By ID
        [Fact]
        public async Task GetTicketByIdAsync_ShouldReturnTicket()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var dto = new CreateTicketDto
            {
                Title = "Login Issue",
                Description = "Unable to login",
                CustomerName = "Amit Kumar",
                CustomerEmail = "amit@gmail.com",
                Priority = "Critical",
                Status = "Open",
                AssignedTo = "David Brown"
            };

            var createdTicket = await service.CreateTicketAsync(dto);

            var result = await service.GetTicketByIdAsync(createdTicket.Id);

            Assert.NotNull(result);
            Assert.Equal("Login Issue", result!.Title);
            Assert.Equal("Amit Kumar", result.CustomerName);
        }

        // Test 3: Update Ticket
        [Fact]
        public async Task UpdateTicketAsync_ShouldUpdateTicket()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var createDto = new CreateTicketDto
            {
                Title = "Old Title",
                Description = "Old Description",
                CustomerName = "Rohan",
                CustomerEmail = "rohan@gmail.com",
                Priority = "Low",
                Status = "Open",
                AssignedTo = "John Smith"
            };

            var ticket = await service.CreateTicketAsync(createDto);

            var updateDto = new UpdateTicketDto
            {
                Title = "Updated Title",
                Description = "Updated Description",
                CustomerName = "Rohan",
                CustomerEmail = "rohan@gmail.com",
                Priority = "High",
                Status = "In Progress",
                AssignedTo = "Sarah Wilson"
            };

            var result = await service.UpdateTicketAsync(
                ticket.Id,
                updateDto
            );

            Assert.NotNull(result);
            Assert.Equal("Updated Title", result!.Title);
            Assert.Equal("High", result.Priority);
            Assert.Equal("In Progress", result.Status);
            Assert.Equal("Sarah Wilson", result.AssignedTo);
        }

        // Test 4: Delete Ticket
        [Fact]
        public async Task DeleteTicketAsync_ShouldDeleteTicket()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var dto = new CreateTicketDto
            {
                Title = "Delete Test",
                Description = "Ticket for delete testing",
                CustomerName = "Test User",
                CustomerEmail = "delete@gmail.com",
                Priority = "Medium",
                Status = "Open",
                AssignedTo = "John Smith"
            };

            var ticket = await service.CreateTicketAsync(dto);

            var result = await service.DeleteTicketAsync(ticket.Id);

            Assert.True(result);

            var deletedTicket =
                await service.GetTicketByIdAsync(ticket.Id);

            Assert.Null(deletedTicket);
        }

        // Test 5: Update Status
        [Fact]
        public async Task UpdateStatusAsync_ShouldChangeStatus()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var createDto = new CreateTicketDto
            {
                Title = "Status Test",
                Description = "Testing status update",
                CustomerName = "Test Customer",
                CustomerEmail = "status@gmail.com",
                Priority = "Medium",
                Status = "Open",
                AssignedTo = "John Smith"
            };

            var ticket = await service.CreateTicketAsync(createDto);

            var statusDto = new StatusUpdateDto
            {
                Status = "Resolved"
            };

            var result = await service.UpdateStatusAsync(
                ticket.Id,
                statusDto
            );

            Assert.NotNull(result);
            Assert.Equal("Resolved", result!.Status);
        }

        // Test 6: Ticket Not Found
        [Fact]
        public async Task GetTicketByIdAsync_ShouldReturnNull_WhenTicketDoesNotExist()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var result = await service.GetTicketByIdAsync(999);

            Assert.Null(result);
        }

        // Test 7: Delete Non Existing Ticket
        [Fact]
        public async Task DeleteTicketAsync_ShouldReturnFalse_WhenTicketDoesNotExist()
        {
            using var context = GetDbContext();

            var service = new TicketService(context);

            var result = await service.DeleteTicketAsync(999);

            Assert.False(result);
        }
    }
}