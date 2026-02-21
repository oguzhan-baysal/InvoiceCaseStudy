using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceApi.Data;

namespace InvoiceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dashboard istatistikleri
        /// </summary>
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalInvoices = await _context.Invoices.CountAsync();
            var totalCustomers = await _context.Customers.CountAsync();

            // SQLite does not support SumAsync with decimal, so we compute in memory
            var allAmounts = await _context.Invoices
                .Select(i => i.TotalAmount)
                .ToListAsync();
            var totalAmount = allAmounts.Any() ? allAmounts.Sum() : 0m;

            var last30Days = DateTime.UtcNow.AddDays(-30);
            var recentInvoiceData = await _context.Invoices
                .Where(i => i.InvoiceDate >= last30Days)
                .Select(i => i.TotalAmount)
                .ToListAsync();
            var recentAmount = recentInvoiceData.Any() ? recentInvoiceData.Sum() : 0m;
            var recentCount = recentInvoiceData.Count;

            var recentInvoices = await _context.Invoices
                .Include(i => i.Customer)
                .OrderByDescending(i => i.InvoiceDate)
                .Take(5)
                .Select(i => new
                {
                    i.InvoiceId,
                    i.InvoiceNumber,
                    CustomerTitle = i.Customer != null ? i.Customer.Title : "",
                    i.InvoiceDate,
                    i.TotalAmount
                })
                .ToListAsync();

            return Ok(new
            {
                totalInvoices,
                totalCustomers,
                totalAmount,
                recentAmount,
                recentCount,
                recentInvoices
            });
        }
    }
}
