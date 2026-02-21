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
    public class InvoiceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InvoiceController(AppDbContext context)
        {
            _context = context;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }

        /// <summary>
        /// Yeni fatura kaydet
        /// </summary>
        [HttpPost("save")]
        public async Task<IActionResult> InvoiceSave([FromBody] InvoiceDto input)
        {
            if (input == null)
                return BadRequest(new { message = "Geçersiz fatura verisi." });

            var userId = GetCurrentUserId();

            var invoice = new Invoice
            {
                CustomerId = input.CustomerId,
                InvoiceNumber = input.InvoiceNumber,
                InvoiceDate = input.InvoiceDate,
                TotalAmount = input.TotalAmount,
                UserId = userId,
                RecordDate = DateTime.UtcNow,
                InvoiceLines = input.InvoiceLines.Select(line => new InvoiceLine
                {
                    ItemName = line.ItemName,
                    Quantity = line.Quantity,
                    Price = line.Price,
                    UserId = userId,
                    RecordDate = DateTime.UtcNow
                }).ToList()
            };

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Fatura başarıyla kaydedildi.", invoiceId = invoice.InvoiceId });
        }

        /// <summary>
        /// Fatura güncelle
        /// </summary>
        [HttpPut("update")]
        public async Task<IActionResult> InvoiceUpdate([FromBody] InvoiceDto input)
        {
            if (input == null)
                return BadRequest(new { message = "Geçersiz fatura verisi." });

            var invoice = await _context.Invoices
                .Include(i => i.InvoiceLines)
                .FirstOrDefaultAsync(i => i.InvoiceId == input.InvoiceId);

            if (invoice == null)
                return NotFound(new { message = "Fatura bulunamadı." });

            var userId = GetCurrentUserId();

            invoice.CustomerId = input.CustomerId;
            invoice.InvoiceNumber = input.InvoiceNumber;
            invoice.InvoiceDate = input.InvoiceDate;
            invoice.TotalAmount = input.TotalAmount;
            invoice.UserId = userId;

            // Remove existing lines and add new ones
            _context.InvoiceLines.RemoveRange(invoice.InvoiceLines);
            invoice.InvoiceLines = input.InvoiceLines.Select(line => new InvoiceLine
            {
                ItemName = line.ItemName,
                Quantity = line.Quantity,
                Price = line.Price,
                UserId = userId,
                RecordDate = DateTime.UtcNow
            }).ToList();

            await _context.SaveChangesAsync();

            return Ok(new { message = "Fatura başarıyla güncellendi." });
        }

        /// <summary>
        /// Fatura sil
        /// </summary>
        [HttpDelete("delete")]
        public async Task<IActionResult> InvoiceDelete([FromBody] InvoiceDeleteRequest input)
        {
            if (input == null)
                return BadRequest(new { message = "Geçersiz istek." });

            var invoice = await _context.Invoices
                .Include(i => i.InvoiceLines)
                .FirstOrDefaultAsync(i => i.InvoiceId == input.InvoiceId);

            if (invoice == null)
                return NotFound(new { message = "Fatura bulunamadı." });

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Fatura başarıyla silindi." });
        }

        /// <summary>
        /// Tarih aralığına göre fatura listesi
        /// </summary>
        [HttpGet("list")]
        public async Task<IActionResult> InvoiceList(
            [FromQuery] DateTime? startdate,
            [FromQuery] DateTime? enddate)
        {
            var query = _context.Invoices
                .Include(i => i.Customer)
                .Include(i => i.InvoiceLines)
                .AsQueryable();

            if (startdate.HasValue)
            {
                var start = startdate.Value.Date;
                query = query.Where(i => i.InvoiceDate >= start);
            }

            if (enddate.HasValue)
            {
                var end = enddate.Value.Date.AddDays(1).AddTicks(-1);
                query = query.Where(i => i.InvoiceDate <= end);
            }

            var invoices = await query
                .OrderByDescending(i => i.InvoiceDate)
                .Select(i => new InvoiceDto
                {
                    InvoiceId = i.InvoiceId,
                    CustomerId = i.CustomerId,
                    CustomerTitle = i.Customer != null ? i.Customer.Title : "",
                    InvoiceNumber = i.InvoiceNumber,
                    InvoiceDate = i.InvoiceDate,
                    TotalAmount = i.TotalAmount,
                    InvoiceLines = i.InvoiceLines.Select(line => new InvoiceLineDto
                    {
                        InvoiceLineId = line.InvoiceLineId,
                        InvoiceId = line.InvoiceId,
                        ItemName = line.ItemName,
                        Quantity = line.Quantity,
                        Price = line.Price
                    }).ToList()
                })
                .ToListAsync();

            return Ok(invoices);
        }
    }
}
