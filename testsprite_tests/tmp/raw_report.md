
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** InvoiceCaseStudy
- **Date:** 2026-02-21
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Başarılı giriş: Login’den dashboard’a yönlendirme
- **Test Code:** [TC001_Baarl_giri_Loginden_dashboarda_ynlendirme.py](./TC001_Baarl_giri_Loginden_dashboarda_ynlendirme.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/89faaefc-0c28-4b60-8a3d-0f9efab2df7b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Hatalı şifre: Hata toast görünür ve login sayfasında kalınır
- **Test Code:** [TC002_Hatal_ifre_Hata_toast_grnr_ve_login_sayfasnda_kalnr.py](./TC002_Hatal_ifre_Hata_toast_grnr_ve_login_sayfasnda_kalnr.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Error notification not displayed after submitting incorrect credentials ('admin' / 'wrong-password-123').
- No toast message or visible error element found on the login page following the failed login attempt.
- Login form remains visible and URL contains '/login', but no feedback explaining the failure was provided.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/0f5ec3ac-185b-4786-83ff-0b1957fd5dee
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Var olmayan kullanıcı: Hata toast görünür ve login sayfasında kalınır
- **Test Code:** [TC003_Var_olmayan_kullanc_Hata_toast_grnr_ve_login_sayfasnda_kalnr.py](./TC003_Var_olmayan_kullanc_Hata_toast_grnr_ve_login_sayfasnda_kalnr.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/cdf9da0f-9af3-4d88-bb61-595be825844e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Boş alanlar: Form doğrulama ile giriş engellenir
- **Test Code:** [TC004_Bo_alanlar_Form_dorulama_ile_giri_engellenir.py](./TC004_Bo_alanlar_Form_dorulama_ile_giri_engellenir.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/a32d4753-375c-4bcf-a7d7-d0cd19bfe784
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Sadece kullanıcı adı girili: Şifre zorunlu uyarısı ile giriş engellenir
- **Test Code:** [TC005_Sadece_kullanc_ad_girili_ifre_zorunlu_uyars_ile_giri_engellenir.py](./TC005_Sadece_kullanc_ad_girili_ifre_zorunlu_uyars_ile_giri_engellenir.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/9464dca8-3868-4781-9760-4fd147dba743
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Sadece şifre girili: Kullanıcı adı zorunlu uyarısı ile giriş engellenir
- **Test Code:** [TC006_Sadece_ifre_girili_Kullanc_ad_zorunlu_uyars_ile_giri_engellenir.py](./TC006_Sadece_ifre_girili_Kullanc_ad_zorunlu_uyars_ile_giri_engellenir.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/91ea693f-6e42-4c97-a79c-14832565cc7c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Dashboard KPI kartları ve Son Faturalar tablosu başarıyla yüklenir
- **Test Code:** [TC007_Dashboard_KPI_kartlar_ve_Son_Faturalar_tablosu_baaryla_yklenir.py](./TC007_Dashboard_KPI_kartlar_ve_Son_Faturalar_tablosu_baaryla_yklenir.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/db0e1566-3ade-468d-bc28-0df2714e1179
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Dashboard açılışında istatistik kartları görünür ve temel KPI başlıkları mevcut
- **Test Code:** [TC008_Dashboard_alnda_istatistik_kartlar_grnr_ve_temel_KPI_balklar_mevcut.py](./TC008_Dashboard_alnda_istatistik_kartlar_grnr_ve_temel_KPI_balklar_mevcut.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/283a2c12-d67f-4dcf-be1e-42eb573d2847
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Dashboard Son Faturalar tablosu görünür ve tablo başlıkları mevcut
- **Test Code:** [TC009_Dashboard_Son_Faturalar_tablosu_grnr_ve_tablo_balklar_mevcut.py](./TC009_Dashboard_Son_Faturalar_tablosu_grnr_ve_tablo_balklar_mevcut.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/28ce0b31-8339-485f-81d5-11063b3c2c7c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Dashboard sayfasında temel içerik bölümleri görünür (sayfa iskeleti)
- **Test Code:** [TC010_Dashboard_sayfasnda_temel_ierik_blmleri_grnr_sayfa_iskeleti.py](./TC010_Dashboard_sayfasnda_temel_ierik_blmleri_grnr_sayfa_iskeleti.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/94a090a7-6c8d-49f0-80a4-0dfe4bdf4bb3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Tarih aralığına göre fatura listesini filtreleme
- **Test Code:** [TC011_Tarih_aralna_gre_fatura_listesini_filtreleme.py](./TC011_Tarih_aralna_gre_fatura_listesini_filtreleme.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Filtered date range 2026-02-01 to 2026-02-28 was applied but an invoice dated 15.01.2026 (outside the selected range) is still displayed.
- The invoice list shows 'Toplam 2 fatura listelendi.' while only 1 invoice falls within the selected date range, indicating incorrect filtering.
- Filtering did not exclude invoices outside the selected start/end dates, so the UI did not reflect the expected filtered result.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/e44878c6-7738-4ff3-bc9d-46b8054b53bb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Tarih aralığı filtresi uygula ve sonuçların ekranda değiştiğini gör
- **Test Code:** [TC012_Tarih_aral_filtresi_uygula_ve_sonularn_ekranda_deitiini_gr.py](./TC012_Tarih_aral_filtresi_uygula_ve_sonularn_ekranda_deitiini_gr.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/65dd830b-54ac-4456-baeb-557dec85dafe
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Yeni fatura oluşturma: müşteri seç, satır ekle, kaydet ve listede gör
- **Test Code:** [TC013_Yeni_fatura_oluturma_mteri_se_satr_ekle_kaydet_ve_listede_gr.py](./TC013_Yeni_fatura_oluturma_mteri_se_satr_ekle_kaydet_ve_listede_gr.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/e74b8d4d-5f27-4102-9ab5-e8bfc1f26aae
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Yeni fatura formu açılır ve alanlar doldurulabilir
- **Test Code:** [TC014_Yeni_fatura_formu_alr_ve_alanlar_doldurulabilir.py](./TC014_Yeni_fatura_formu_alr_ve_alanlar_doldurulabilir.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/a6d9ad29-f657-446b-9def-4a18c3325773
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Yeni fatura validasyon: müşteri boşken kaydetmeye izin verilmez
- **Test Code:** [TC015_Yeni_fatura_validasyon_mteri_boken_kaydetmeye_izin_verilmez.py](./TC015_Yeni_fatura_validasyon_mteri_boken_kaydetmeye_izin_verilmez.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/8e2d80e4-4700-48fa-befe-f76162d88782
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Yeni müşteri ekleme (başarılı) ve listede görünmesi
- **Test Code:** [TC016_Yeni_mteri_ekleme_baarl_ve_listede_grnmesi.py](./TC016_Yeni_mteri_ekleme_baarl_ve_listede_grnmesi.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/1d70ca9a-25f0-4005-9639-a53b8f61b4a9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Yeni müşteri ekleme (aynı e-posta) - 409 duplicate hatası
- **Test Code:** [TC017_Yeni_mteri_ekleme_ayn_e_posta___409_duplicate_hatas.py](./TC017_Yeni_mteri_ekleme_ayn_e_posta___409_duplicate_hatas.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Customer creation modal does not contain an 'Ad Soyad' (Customer Name) input field; the test step to enter the customer name cannot be completed.
- The test requires attempting registration with an existing email (duplicate@example.com) but that email is not present in the current customer list, so the duplicate-email validation cannot be verified as specified.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/69a8a05d-0ddd-42b0-852f-145b80d01cb5
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Müşteri düzenleme (başarılı) ve listede güncellemenin görünmesi
- **Test Code:** [TC018_Mteri_dzenleme_baarl_ve_listede_gncellemenin_grnmesi.py](./TC018_Mteri_dzenleme_baarl_ve_listede_gncellemenin_grnmesi.py)
- **Test Error:** TEST FAILURE

ASSERTIONS:
- Kaydet (save) button not interactable: click action failed twice (elements indices used were not interactable or became stale), so the save could not be performed via the UI during this test.
- No 'Başarılı' toast was observed after the attempted save actions, so success notification cannot be verified.
- Unable to confirm that the edit/save flow completed in this session because the modal could not be submitted successfully.
- Although the customer name 'Güncellenmiş Müşteri' is visible in the customers list, there is no evidence that this test run performed the save (the updated name may have been present before the test).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/af775fb6-ce48-4b71-9333-5d20a8e54a21
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Müşteri silme (başarılı) ve listeden kaldırılması
- **Test Code:** [TC019_Mteri_silme_baarl_ve_listeden_kaldrlmas.py](./TC019_Mteri_silme_baarl_ve_listeden_kaldrlmas.py)
- **Test Error:** Waited for 5 seconds
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/b67e71c2-62ad-418a-9ac4-9fdda899d4e3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Yeni müşteri modalını iptal etme (kayıt yapılmaz)
- **Test Code:** [TC020_Yeni_mteri_modaln_iptal_etme_kayt_yaplmaz.py](./TC020_Yeni_mteri_modaln_iptal_etme_kayt_yaplmaz.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/8bced162-51ac-4dbd-a6dc-181f3917cbae
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Müşteri listesi sayfası açılışı ve temel görünürlük kontrolleri
- **Test Code:** [TC021_Mteri_listesi_sayfas_al_ve_temel_grnrlk_kontrolleri.py](./TC021_Mteri_listesi_sayfas_al_ve_temel_grnrlk_kontrolleri.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/89b27d25-3509-48b1-bae2-0024011d744f/30da1530-86c0-47ec-802e-287c593d98ed
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **76.19** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---