using SupportTicketAPI.Models;

namespace SupportTicketAPI.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Tickets.Any())
            {
                return;
            }

            var tickets = new List<Ticket>
            {
                new Ticket
                {
                    Title = "Payment Failed",
                    Description = "Customer is unable to complete the payment.",
                    CustomerName = "Rahul Sharma",
                    CustomerEmail = "rahul.sharma@gmail.com",
                    Priority = "High",
                    Status = "Open",
                    AssignedTo = "John Smith",
                    CreatedDate = DateTime.UtcNow.AddDays(-10),
                    UpdatedDate = DateTime.UtcNow.AddDays(-2)
                },

                new Ticket
                {
                    Title = "Unable to Login",
                    Description = "Customer cannot login to their account.",
                    CustomerName = "Amit Kumar",
                    CustomerEmail = "amit.kumar@gmail.com",
                    Priority = "Medium",
                    Status = "In Progress",
                    AssignedTo = "Sarah Wilson",
                    CreatedDate = DateTime.UtcNow.AddDays(-9),
                    UpdatedDate = DateTime.UtcNow.AddDays(-1)
                },

                new Ticket
                {
                    Title = "Account Locked",
                    Description = "Customer account has been locked after multiple login attempts.",
                    CustomerName = "Priya Singh",
                    CustomerEmail = "priya.singh@gmail.com",
                    Priority = "Critical",
                    Status = "Open",
                    AssignedTo = "David Brown",
                    CreatedDate = DateTime.UtcNow.AddDays(-8),
                    UpdatedDate = DateTime.UtcNow.AddDays(-3)
                },

                new Ticket
                {
                    Title = "Refund Request",
                    Description = "Customer requested a refund for the recent transaction.",
                    CustomerName = "Neha Sharma",
                    CustomerEmail = "neha.sharma@gmail.com",
                    Priority = "High",
                    Status = "Resolved",
                    AssignedTo = "John Smith",
                    CreatedDate = DateTime.UtcNow.AddDays(-7),
                    UpdatedDate = DateTime.UtcNow.AddDays(-1)
                },

                new Ticket
                {
                    Title = "Password Reset",
                    Description = "Customer is unable to reset their password.",
                    CustomerName = "Rohan Mehta",
                    CustomerEmail = "rohan.mehta@gmail.com",
                    Priority = "Low",
                    Status = "Closed",
                    AssignedTo = "Sarah Wilson",
                    CreatedDate = DateTime.UtcNow.AddDays(-6),
                    UpdatedDate = DateTime.UtcNow.AddDays(-2)
                },

                new Ticket
                {
                    Title = "Invoice Not Received",
                    Description = "Customer has not received the invoice for their purchase.",
                    CustomerName = "Anjali Verma",
                    CustomerEmail = "anjali.verma@gmail.com",
                    Priority = "Medium",
                    Status = "Open",
                    AssignedTo = "David Brown",
                    CreatedDate = DateTime.UtcNow.AddDays(-5),
                    UpdatedDate = DateTime.UtcNow.AddDays(-1)
                },

                new Ticket
                {
                    Title = "Subscription Issue",
                    Description = "Customer subscription is not showing correctly.",
                    CustomerName = "Karan Patel",
                    CustomerEmail = "karan.patel@gmail.com",
                    Priority = "High",
                    Status = "In Progress",
                    AssignedTo = "John Smith",
                    CreatedDate = DateTime.UtcNow.AddDays(-4),
                    UpdatedDate = DateTime.UtcNow
                },

                new Ticket
                {
                    Title = "Service Not Working",
                    Description = "Customer reports that the service is currently unavailable.",
                    CustomerName = "Sneha Kapoor",
                    CustomerEmail = "sneha.kapoor@gmail.com",
                    Priority = "Critical",
                    Status = "In Progress",
                    AssignedTo = "David Brown",
                    CreatedDate = DateTime.UtcNow.AddDays(-3),
                    UpdatedDate = DateTime.UtcNow
                },

                new Ticket
                {
                    Title = "Wrong Amount Charged",
                    Description = "Customer was charged an incorrect amount.",
                    CustomerName = "Vikas Gupta",
                    CustomerEmail = "vikas.gupta@gmail.com",
                    Priority = "High",
                    Status = "Resolved",
                    AssignedTo = "Sarah Wilson",
                    CreatedDate = DateTime.UtcNow.AddDays(-2),
                    UpdatedDate = DateTime.UtcNow
                },

                new Ticket
                {
                    Title = "Profile Update Issue",
                    Description = "Customer cannot update their profile information.",
                    CustomerName = "Pooja Malhotra",
                    CustomerEmail = "pooja.malhotra@gmail.com",
                    Priority = "Low",
                    Status = "Closed",
                    AssignedTo = "John Smith",
                    CreatedDate = DateTime.UtcNow.AddDays(-1),
                    UpdatedDate = DateTime.UtcNow
                }
            };

            context.Tickets.AddRange(tickets);

            context.SaveChanges();
        }
    }
}