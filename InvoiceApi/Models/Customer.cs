using System.ComponentModel.DataAnnotations;

namespace InvoiceApi.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [MaxLength(20)]
        public string TaxNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(100)]
        public string EMail { get; set; } = string.Empty;

        public int UserId { get; set; }

        public DateTime RecordDate { get; set; } = DateTime.UtcNow;
    }
}
