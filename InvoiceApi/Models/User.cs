using System.ComponentModel.DataAnnotations;

namespace InvoiceApi.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        public DateTime RecordDate { get; set; } = DateTime.UtcNow;
    }
}
