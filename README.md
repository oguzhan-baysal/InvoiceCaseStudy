<img width="1280" height="569" alt="Image" src="https://github.com/user-attachments/assets/9fcf2988-087a-4ed4-a887-6db9bef43ace" />







# 🧾 Invoice Management System - Case Study

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş uçtan uca bir **Fatura Yönetim Sistemi** portalıdır. Bir Case Study kapsamında hazırlanmış olup, hem Backend hem de Frontend mimarisiyle profesyonel standartları hedeflemektedir.

## 🚀 Hızlı Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### 1. Ön Gereksinimler
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) **20.19+** (Angular 21, Node 18'i desteklemez; Node 24 LTS önerilir)

Global Angular CLI kurulumu gerekmez: `@angular/cli` projenin `devDependencies` paketidir ve `npm install` ile birlikte gelir. Komutlar `npm` script'leri üzerinden çalıştırılır.

### 2. Backend Çalıştırma (ASP.NET Core API)
Backend ayağa kalktığında `InvoiceApi/invoice.db` SQLite dosyasını otomatik oluşturur ve örnek verileri (seed data) yükler; migration komutu çalıştırmanız gerekmez.
```bash
cd InvoiceApi
dotnet run
```
- **API URL:** `http://localhost:5000`
- **Swagger Dokümantasyonu:** `http://localhost:5000/swagger`

### 3. Frontend Çalıştırma (Angular)
Frontend, `/api` isteklerini `invoice-client/proxy.conf.json` üzerinden `http://localhost:5000` adresine yönlendirir; bu nedenle **önce backend çalışıyor olmalıdır**, aksi halde API çağrıları başarısız olur.
```bash
cd invoice-client
npm install
npm start
```
- **Uygulama URL:** `http://localhost:4200`

### 4. Yapılandırma
Tüm ayarlar `InvoiceApi/appsettings.json` dosyasından okunur, ek bir `.env` dosyası gerekmez.

| Anahtar | Açıklama | Varsayılan |
| --- | --- | --- |
| `ConnectionStrings:DefaultConnection` | EF Core / SQLite bağlantı dizesi | `Data Source=invoice.db` |
| `Jwt:Key` | JWT imzalama anahtarı (`Program.cs` ve `AuthController` tarafından okunur) | Geliştirme anahtarı |
| `Jwt:Issuer` | Token `iss` değeri | `InvoiceApi` |
| `Jwt:Audience` | Token `aud` değeri | `InvoiceClient` |

Gerçek bir dağıtımda JWT anahtarını dosyada tutmak yerine kullanıcı gizli anahtarları (user secrets) veya ortam değişkenleri ile geçersiz kılın:
```bash
cd InvoiceApi
dotnet user-secrets init
dotnet user-secrets set "Jwt:Key" "<uretim-anahtari>"
```
Ortam değişkeni karşılıkları: `ConnectionStrings__DefaultConnection`, `Jwt__Key`, `Jwt__Issuer`, `Jwt__Audience`.

---

## 🔐 Demo Erişim Bilgileri
- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

---

## 🏗 Teknik Mimari

### Backend (ASP.NET Core 8)
- **RESTful API Tasarımı:** Standart HTTP metodları (GET, POST, PUT, DELETE) ile CRUD operasyonları.
- **Güvenlik:** **JWT (JSON Web Token)** tabanlı kimlik doğrulama.
- **ORM:** Entity Framework Core (SQLite).
- **Veri Transferi:** DTO (Data Transfer Objects) kullanımı ile veritabanı entity'lerinin soyutlanması.
- **Middleware:** Merkezi hata yönetimi ve JSON döngüsel referans yönetimi.

### Frontend (Angular 21)
- **Zoneless Architecture:** Angular 21'in yeni zoneless (zone.js içermeyen) mimarisi kullanılarak yüksek performans hedeflenmiştir.
- **Reaktivite:** Durum yönetimi için **Angular Signals** kullanılmıştır.
- **Güvenlik:** AuthGuard ve HTTP Interceptor yapıları ile JWT entegrasyonu sağlanmıştır.
- **Tasarım:** Bootstrap 5 ve Bootstrap Icons ile responsive kullanıcı arayüzü.

## 📁 Proje Yapısı
- `InvoiceApi/`: API kontrolcüleri, DTO'lar, DB modelleri ve Context yapısı.
- `invoice-client/`: Modern Angular bileşenleri, servisler, guard ve interceptor yapıları.

## ✨ Özellikler
- ✅ JWT Authentication & Session Management
- ✅ Dashboard İstatistik Paneli (KPI Kartları)
- ✅ Fatura CRUD (Ekleme, Düzenleme, Silme)
- ✅ Müşteri Yönetimi (Full CRUD)
- ✅ PDF Fatura Dışa Aktarma (jsPDF)
- ✅ Toast Bildirim Sistemi (Signals)
- ✅ Fatura Filtreleme (Tarih Aralığı)
- ✅ Dinamik Fatura Kalemi Ekleme/Çıkarma
- ✅ Otomatik Tutar Hesaplamaları
- ✅ SQLite ile Taşınabilir Veritabanı
- ✅ Swagger OpenAPI Entegrasyonu
- ✅ Responsive Tasarım (Bootstrap 5)
