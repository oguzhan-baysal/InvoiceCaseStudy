import { Injectable } from '@angular/core';
import { Invoice } from '../models/models';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
    providedIn: 'root'
})
export class PdfService {
    private fontLoaded = false;
    private fontData: string | null = null;

    async loadFont(): Promise<void> {
        if (this.fontLoaded) return;

        try {
            const response = await fetch('https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbGmT.ttf');
            const buffer = await response.arrayBuffer();

            // Convert ArrayBuffer to base64 string
            const bytes = new Uint8Array(buffer);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            this.fontData = btoa(binary);
            this.fontLoaded = true;
        } catch (e) {
            console.warn('Font yüklenemedi, varsayılan font kullanılacak.', e);
        }
    }

    private applyFont(doc: jsPDF): void {
        if (this.fontData) {
            doc.addFileToVFS('Roboto-Regular.ttf', this.fontData);
            doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
            doc.setFont('Roboto');
        }
    }

    async exportInvoicePdf(invoice: Invoice): Promise<void> {
        await this.loadFont();

        const doc = new jsPDF();
        this.applyFont(doc);

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;

        // ── Top accent bar ──
        doc.setFillColor(67, 97, 238);
        doc.rect(0, 0, pageWidth, 4, 'F');

        // ── Company / Title area ──
        doc.setFontSize(24);
        doc.setTextColor(30, 30, 50);
        doc.text('FATURA', margin, 28);

        doc.setFontSize(9);
        doc.setTextColor(130, 130, 150);
        doc.text('Fatura Yönetim Sistemi', margin, 35);

        // ── Right-aligned invoice meta ──
        const rightCol = pageWidth - margin;

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 120);
        doc.text('Fatura No:', rightCol - 55, 20);
        doc.setTextColor(30, 30, 50);
        doc.setFontSize(12);
        doc.text(invoice.invoiceNumber, rightCol, 20, { align: 'right' });

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 120);
        doc.text('Tarih:', rightCol - 55, 28);
        doc.setTextColor(30, 30, 50);
        doc.text(new Date(invoice.invoiceDate).toLocaleDateString('tr-TR'), rightCol, 28, { align: 'right' });

        // ── Divider ──
        doc.setDrawColor(230, 230, 235);
        doc.setLineWidth(0.5);
        doc.line(margin, 42, pageWidth - margin, 42);

        // ── Customer info box ──
        doc.setFillColor(247, 248, 252);
        doc.roundedRect(margin, 48, pageWidth - margin * 2, 28, 3, 3, 'F');

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 120);
        doc.text('MUSTERI BILGILERI', margin + 8, 56);

        doc.setFontSize(11);
        doc.setTextColor(30, 30, 50);
        doc.text(invoice.customerTitle || '-', margin + 8, 64);

        // ── Invoice Lines Table ──
        const tableData = invoice.invoiceLines.map((line, index) => [
            (index + 1).toString(),
            line.itemName,
            line.quantity.toString(),
            this.formatAmount(line.price) + ' TL',
            this.formatAmount(line.quantity * line.price) + ' TL'
        ]);

        autoTable(doc, {
            startY: 84,
            head: [['#', 'Urun / Hizmet', 'Miktar', 'Birim Fiyat', 'Toplam']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [67, 97, 238],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center',
                fontSize: 9,
                cellPadding: 5,
                font: this.fontLoaded ? 'Roboto' : 'helvetica'
            },
            bodyStyles: {
                fontSize: 9,
                cellPadding: 5,
                textColor: [50, 50, 60],
                font: this.fontLoaded ? 'Roboto' : 'helvetica'
            },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                1: { cellWidth: 65 },
                2: { halign: 'center', cellWidth: 25 },
                3: { halign: 'right', cellWidth: 35 },
                4: { halign: 'right', cellWidth: 35 }
            },
            alternateRowStyles: {
                fillColor: [248, 249, 253]
            },
            styles: {
                lineColor: [230, 230, 235],
                lineWidth: 0.3
            }
        });

        // ── Grand Total ──
        const finalY = (doc as any).lastAutoTable.finalY + 12;

        // Total background box
        doc.setFillColor(67, 97, 238);
        doc.roundedRect(pageWidth - margin - 80, finalY - 2, 80, 18, 3, 3, 'F');

        doc.setFontSize(9);
        doc.setTextColor(200, 210, 255);
        doc.text('GENEL TOPLAM', pageWidth - margin - 74, finalY + 6);

        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.text(this.formatAmount(invoice.totalAmount) + ' TL', pageWidth - margin - 4, finalY + 13, { align: 'right' });

        // ── Footer ──
        const footerY = doc.internal.pageSize.getHeight() - 15;
        doc.setDrawColor(230, 230, 235);
        doc.setLineWidth(0.3);
        doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

        doc.setFontSize(7);
        doc.setTextColor(170, 170, 185);
        doc.text(
            `Bu belge Fatura Yonetim Sistemi tarafindan ${new Date().toLocaleDateString('tr-TR')} tarihinde olusturulmustur.`,
            pageWidth / 2, footerY, { align: 'center' }
        );

        // ── Save ──
        doc.save(`Fatura_${invoice.invoiceNumber}.pdf`);
    }

    private formatAmount(amount: number): string {
        return amount.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}
