using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InvoiceApi.Models
{
    public class InvoiceLine
    {
        [Key]
        public int InvoiceLineId { get; set; }

        [Required]
        public int InvoiceId { get; set; }

        [Required]
        [MaxLength(200)]
        public string ItemName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public int UserId { get; set; }

        public DateTime RecordDate { get; set; } = DateTime.UtcNow;

        // Navigation property
        [ForeignKey("InvoiceId")]
        public Invoice? Invoice { get; set; }
    }
}
