using System.ComponentModel.DataAnnotations;

namespace SupportTicketAPI.DTOs
{
    public class UpdateTicketDto
    {
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Customer name is required.")]
        public string CustomerName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Customer email is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string CustomerEmail { get; set; } = string.Empty;

        [Required(ErrorMessage = "Priority is required.")]
        public string Priority { get; set; } = string.Empty;

        [Required(ErrorMessage = "Status is required.")]
        public string Status { get; set; } = string.Empty;

        [Required(ErrorMessage = "Assigned To is required.")]
        public string AssignedTo { get; set; } = string.Empty;
    }
}
