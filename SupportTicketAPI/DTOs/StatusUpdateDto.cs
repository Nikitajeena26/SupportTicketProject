using System.ComponentModel.DataAnnotations;

namespace SupportTicketAPI.DTOs
{
    public class StatusUpdateDto
    {
        [Required(ErrorMessage = "Status is required.")]
        public string Status { get; set; } = string.Empty;
    }
}