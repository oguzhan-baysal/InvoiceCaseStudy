# 🧾 Invoice Management System - Case Study

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş uçtan uca bir **Fatura Yönetim Sistemi** portalıdır. Bir Case Study kapsamında hazırlanmış olup, hem Backend hem de Frontend mimarisiyle profesyonel standartları hedeflemektedir.

## 🚀 Hızlı Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### 1. Ön Gereksinimler
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.io/cli)

### 2. Backend Çalıştırma (ASP.NET Core API)
Backend ayağa kalktığında otomatik olarak bir SQLite veritabanı oluşturur ve örnek verileri (seed data) yükler.
```bash
cd InvoiceApi
dotnet run
```
- **API URL:** `http://localhost:5000`
- **Swagger Dokümantasyonu:** `http://localhost:5000/swagger`

### 3. Frontend Çalıştırma (Angular)
```bash
cd invoice-client
npm install
npm start
```
- **Uygulama URL:** `http://localhost:4200`

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
- ✅ Fatura Filtreleme (Tarih Aralığı)
- ✅ Dinamik Fatura Kalemi Ekleme/Çıkarma
- ✅ Otomatik Tutar ve KDV Hesaplamaları
- ✅ SQLite ile Taşınabilir Veritabanı
- ✅ Swagger OpenAPI Entegrasyonu
```
