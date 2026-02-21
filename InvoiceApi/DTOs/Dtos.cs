namespace InvoiceApi.DTOs
{
    public class LoginRequest
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int UserId { get; set; }
    }

    public class InvoiceLineDto
    {
        public int InvoiceLineId { get; set; }
        public int InvoiceId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class InvoiceDto
    {
        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }
        public string? CustomerTitle { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public List<InvoiceLineDto> InvoiceLines { get; set; } = new List<InvoiceLineDto>();
    }

    public class InvoiceDeleteRequest
    {
        public int InvoiceId { get; set; }
    }

    public class CustomerDto
    {
        public int CustomerId { get; set; }
        public string TaxNumber { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EMail { get; set; } = string.Empty;
    }
}
