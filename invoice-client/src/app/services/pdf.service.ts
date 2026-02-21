import { Injectable } from '@angular/core';
import { Invoice } from '../models/models';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    exportInvoicePdf(invoice: Invoice): void {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(44, 62, 80);
        doc.text('FATURA', 105, 25, { align: 'center' });

        // Divider Line
        doc.setDrawColor(52, 152, 219);
        doc.setLineWidth(0.8);
        doc.line(14, 30, 196, 30);

        // Invoice Info
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);

        doc.text('Fatura No:', 14, 40);
        doc.setTextColor(30, 30, 30);
        doc.text(invoice.invoiceNumber, 50, 40);

        doc.setTextColor(100, 100, 100);
        doc.text('Tarih:', 14, 47);
        doc.setTextColor(30, 30, 30);
        doc.text(new Date(invoice.invoiceDate).toLocaleDateString('tr-TR'), 50, 47);

        doc.setTextColor(100, 100, 100);
        doc.text('Musteri:', 14, 54);
        doc.setTextColor(30, 30, 30);
        doc.text(invoice.customerTitle || '-', 50, 54);

        // Invoice Lines Table
        const tableData = invoice.invoiceLines.map((line, index) => [
            (index + 1).toString(),
            line.itemName,
            line.quantity.toString(),
            this.formatCurrency(line.price),
            this.formatCurrency(line.quantity * line.price)
        ]);

        autoTable(doc, {
            startY: 65,
            head: [['#', 'Urun / Hizmet', 'Miktar', 'Birim Fiyat', 'Toplam']],
            body: tableData,
            theme: 'grid',
            headStyles: {
                fillColor: [52, 152, 219],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'center', cellWidth: 15 },
                1: { cellWidth: 70 },
                2: { halign: 'center', cellWidth: 25 },
                3: { halign: 'right', cellWidth: 35 },
                4: { halign: 'right', cellWidth: 35 }
            },
            styles: {
                fontSize: 9,
                cellPadding: 4
            },
            alternateRowStyles: {
                fillColor: [245, 248, 252]
            }
        });

        // Total Amount
        const finalY = (doc as any).lastAutoTable.finalY + 10;

        doc.setDrawColor(52, 152, 219);
        doc.setLineWidth(0.5);
        doc.line(120, finalY, 196, finalY);

        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.text('GENEL TOPLAM:', 120, finalY + 8);
        doc.setFontSize(14);
        doc.setTextColor(52, 152, 219);
        doc.text(this.formatCurrency(invoice.totalAmount), 196, finalY + 8, { align: 'right' });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 180);
        doc.text(
            `Olusturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}`,
            105, 285, { align: 'center' }
        );

        // Save
        doc.save(`Fatura_${invoice.invoiceNumber}.pdf`);
    }

    private formatCurrency(amount: number): string {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    }
}
