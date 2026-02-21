using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceApi.Data;
using InvoiceApi.DTOs;

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
    }
}
