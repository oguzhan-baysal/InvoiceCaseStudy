using Microsoft.EntityFrameworkCore;
using InvoiceApi.Models;

namespace InvoiceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceLine> InvoiceLines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Customer)
                .WithMany()
                .HasForeignKey(i => i.CustomerId);

            modelBuilder.Entity<InvoiceLine>()
                .HasOne(il => il.Invoice)
                .WithMany(i => i.InvoiceLines)
                .HasForeignKey(il => il.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed data - Admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    UserName = "admin",
                    Password = "admin123",
                    RecordDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // Seed data - Sample customers
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    CustomerId = 1,
                    TaxNumber = "1234567890",
                    Title = "ABC Teknoloji A.Ş.",
                    Address = "İstanbul, Türkiye",
                    EMail = "info@abcteknoloji.com",
                    UserId = 1,
                    RecordDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Customer
                {
                    CustomerId = 2,
                    TaxNumber = "9876543210",
                    Title = "XYZ Yazılım Ltd. Şti.",
                    Address = "Ankara, Türkiye",
                    EMail = "info@xyzyazilim.com",
                    UserId = 1,
                    RecordDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new Customer
                {
                    CustomerId = 3,
                    TaxNumber = "5555555555",
                    Title = "DEF Danışmanlık A.Ş.",
                    Address = "İzmir, Türkiye",
                    EMail = "info@defdanismanlik.com",
                    UserId = 1,
                    RecordDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // Seed data - Sample invoices
            modelBuilder.Entity<Invoice>().HasData(
                new Invoice
                {
                    InvoiceId = 1,
                    CustomerId = 1,
                    InvoiceNumber = "INV-2026-001",
                    InvoiceDate = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                    TotalAmount = 5000.00m,
                    UserId = 1,
                    RecordDate = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc)
                },
                new Invoice
                {
                    InvoiceId = 2,
                    CustomerId = 2,
                    InvoiceNumber = "INV-2026-002",
                    InvoiceDate = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc),
                    TotalAmount = 12500.50m,
                    UserId = 1,
                    RecordDate = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );

            // Seed data - Sample invoice lines
            modelBuilder.Entity<InvoiceLine>().HasData(
                new InvoiceLine
                {
                    InvoiceLineId = 1,
                    InvoiceId = 1,
                    ItemName = "Web Geliştirme Hizmeti",
                    Quantity = 1,
                    Price = 3000.00m,
                    UserId = 1,
                    RecordDate = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc)
                },
                new InvoiceLine
                {
                    InvoiceLineId = 2,
                    InvoiceId = 1,
                    ItemName = "Sunucu Bakım Hizmeti",
                    Quantity = 2,
                    Price = 1000.00m,
                    UserId = 1,
                    RecordDate = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc)
                },
                new InvoiceLine
                {
                    InvoiceLineId = 3,
                    InvoiceId = 2,
                    ItemName = "Mobil Uygulama Geliştirme",
                    Quantity = 1,
                    Price = 10000.00m,
                    UserId = 1,
                    RecordDate = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                new InvoiceLine
                {
                    InvoiceLineId = 4,
                    InvoiceId = 2,
                    ItemName = "UI/UX Tasarım",
                    Quantity = 5,
                    Price = 500.10m,
                    UserId = 1,
                    RecordDate = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}
