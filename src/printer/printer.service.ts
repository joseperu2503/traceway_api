import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  SofiaPro: {
    normal: 'assets/fonts/sofia-pro/SofiaPro-Light.otf',
    bold: 'assets/fonts/sofia-pro/SofiaPro-Regular.otf',
    italics: 'assets/fonts/sofia-pro/SofiaPro-Regular-talic.otf',
  },
  SofiaProBold: {
    normal: 'assets/fonts/sofia-pro/SofiaPro-Bold.otf',
    bold: 'assets/fonts/sofia-pro/SofiaPro-Bold.otf',
  },
  SofiaProSemiBold: {
    normal: 'assets/fonts/sofia-pro/SofiaPro-SemiBold.otf',
    bold: 'assets/fonts/sofia-pro/SofiaPro-SemiBold.otf',
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
