using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InvoiceApi.Data;
using InvoiceApi.DTOs;

namespace InvoiceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Kullanıcı girişi - JWT token döner
        /// </summary>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest input)
        {
            if (input == null || string.IsNullOrEmpty(input.UserName) || string.IsNullOrEmpty(input.Password))
            {
                return BadRequest(new { message = "Kullanıcı adı ve şifre gereklidir." });
            }

            var user = _context.Users.FirstOrDefault(u =>
                u.UserName == input.UserName && u.Password == input.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Geçersiz kullanıcı adı veya şifre." });
            }

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new LoginResponse
            {
                Token = tokenHandler.WriteToken(token),
                UserName = user.UserName,
                UserId = user.UserId
            });
        }
    }
}
