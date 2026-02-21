using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using InvoiceApi.Data;
using InvoiceApi.DTOs;
using InvoiceApi.Models;

namespace InvoiceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomerController(AppDbContext context)
        {
            _context = context;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }

        /// <summary>
        /// Müşteri listesi
        /// </summary>
        [HttpGet("list")]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await _context.Customers
                .OrderBy(c => c.Title)
                .Select(c => new CustomerDto
                {
                    CustomerId = c.CustomerId,
                    TaxNumber = c.TaxNumber,
                    Title = c.Title,
                    Address = c.Address,
                    EMail = c.EMail
                })
                .ToListAsync();

            return Ok(customers);
        }

        /// <summary>
        /// Yeni müşteri kaydet
        /// </summary>
        [HttpPost("save")]
        public async Task<IActionResult> CustomerSave([FromBody] CustomerDto input)
        {
            if (input == null || string.IsNullOrEmpty(input.Title))
                return BadRequest(new { message = "Müşteri bilgileri eksik." });

            var customer = new Customer
            {
                TaxNumber = input.TaxNumber,
                Title = input.Title,
                Address = input.Address,
                EMail = input.EMail,
                UserId = GetCurrentUserId(),
                RecordDate = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Müşteri başarıyla kaydedildi.", customerId = customer.CustomerId });
        }

        /// <summary>
        /// Müşteri güncelle
        /// </summary>
        [HttpPut("update")]
        public async Task<IActionResult> CustomerUpdate([FromBody] CustomerDto input)
        {
            if (input == null)
                return BadRequest(new { message = "Geçersiz müşteri verisi." });

            var customer = await _context.Customers.FindAsync(input.CustomerId);
            if (customer == null)
                return NotFound(new { message = "Müşteri bulunamadı." });

            customer.TaxNumber = input.TaxNumber;
            customer.Title = input.Title;
            customer.Address = input.Address;
            customer.EMail = input.EMail;
            customer.UserId = GetCurrentUserId();

            await _context.SaveChangesAsync();

            return Ok(new { message = "Müşteri başarıyla güncellendi." });
        }

        /// <summary>
        /// Müşteri sil
        /// </summary>
        [HttpDelete("delete")]
        public async Task<IActionResult> CustomerDelete([FromBody] CustomerDeleteRequest input)
        {
            if (input == null)
                return BadRequest(new { message = "Geçersiz istek." });

            var customer = await _context.Customers.FindAsync(input.CustomerId);
            if (customer == null)
                return NotFound(new { message = "Müşteri bulunamadı." });

            // Check if customer has invoices
            var hasInvoices = await _context.Invoices.AnyAsync(i => i.CustomerId == input.CustomerId);
            if (hasInvoices)
                return BadRequest(new { message = "Bu müşteriye ait faturalar bulunduğu için silinemez." });

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Müşteri başarıyla silindi." });
        }
    }

    public class CustomerDeleteRequest
    {
        public int CustomerId { get; set; }
    }
}
