import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generateTableWithRows = (transactions: any) => {
  const data: any = [];

  for (let i = 1; i <= 12; i++) {
    data.push([
      `01-03-2023 ${i}`,
      `SB100002345${i}`,
      `815$`,
      `GBP ${0.5 * i}`,
      `2600 XAF`,
      `Gaston Fornimoh`,
    ]);
  }

  return data;
};

const tableheader = [
  "Date",
  "Transaction ID",
  "Rate",
  "Amount Paid",
  "Amount Received",
  "Name of Recipient",
];

interface generateAccountStatementPDFProps {
  customerName: string;
  customerAddress: string;
  accountNumber: string;
  periodValue: string;
  periodHeaderTitle: string;
  selectedTransaction: any;
}

export const generateAccountStatementPDF = async ({
  customerName,
  customerAddress,
  accountNumber,
  periodValue,
  periodHeaderTitle,
  selectedTransaction,
}: generateAccountStatementPDFProps) => {
  const tableData = selectedTransaction;
  const doc = new jsPDF();
  const headerHeight = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const logoUrl = "/assets/logos/SBRemit_white_logo.png";
  const logoWidth = 37;
  const logoHeight = 8;
  const logoX = pageWidth - logoWidth - 10;
  const availableHeight = pageHeight - headerHeight;
  const marginTopForTableData = headerHeight + 60;
  const gridColor = "#FAF9F9";
  let heightOfTableperPage = 0;
  const estimatedAvailableSpaceForFooter = 250;
  const tableTheme = "grid";

  // customer info
  // const customerName = "Gaston Fornimoh";
  // const customerAddress = "1643 Woodlands Way, Leeds 1643 Woodlands Way, ";
  // const accountNumber = "SB097654236";
  // const periodValue = "01-03-2023 to 31-03-2023";
  // const periodHeaderTitle = "Period: March 1st 2023 to March 31st 2023";
  const headerTitle = "Your Account Statement";
  const fileName = `${periodValue}_sbremit_account_statement`;

  // footer content
  const footerContent1 =
    "Sukate & Bezeboh Ltd is authorised by the Financial Conduct Authority under the Payment Service Regulations 2009 [935783] for the provision of payment services and the Financial and Reporting Analysis Centre of Canada as a Foreign Money Service Business (M21646577). Sukate & Bezeboh Ltd, trading as SB Remit, registered in England and Wales, Company Registration Number 12735266. SB Remit is a registered trademark of Sukate & Bezeboh Ltd.";

  doc.setLineHeightFactor(1.5); // line height: 1.5

  const generatePdfHeader = () => {
    doc.setFillColor(0, 123, 93);
    doc.rect(0, 0, pageWidth, headerHeight, "F");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(headerTitle, 10, 15);

    // Reset the font for the rest of the text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(periodHeaderTitle, 10, 23);

    // Add SB logo to the right side of the header
    doc.addImage(logoUrl, "PNG", logoX, 10, logoWidth, logoHeight);
    // Reset background color and others for the next: generatePdfCustomerInfo
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0, 0, 0);
    doc.rect(0, headerHeight, pageWidth, availableHeight, "F");
    doc.setFontSize(12);
  };

  const generatePdfCustomerInfo = () => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(customerName, 10, headerHeight + 20);

    // Reset the font for the rest of the text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const customerAddressSplit = doc.splitTextToSize(
      customerAddress,
      pageWidth - 120
    );
    doc.text(customerAddressSplit, 10, headerHeight + 27);

    const ConatinerHeight = 8;
    doc.setFillColor(0, 123, 93);
    doc.rect(logoX - 13, headerHeight + 15, 50, ConatinerHeight, "F");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("Statement period", logoX - 5, headerHeight + 20);

    doc.setTextColor(0, 0, 0);
    doc.text(periodValue, logoX - 13, headerHeight + ConatinerHeight + 20);

    doc.setFillColor(0, 123, 93);
    doc.rect(
      logoX - 13,
      headerHeight + ConatinerHeight + 28,
      50,
      ConatinerHeight,
      "F"
    );
    doc.setTextColor(255, 255, 255);
    doc.text("Account No.", logoX, headerHeight + ConatinerHeight + 33);
    doc.setTextColor(0, 0, 0);
    doc.text(accountNumber, logoX - 6, headerHeight + ConatinerHeight + 33 + 9);

    doc.setTextColor(255, 255, 255);
  };

  const generateFooter = () => {
    const finalPageNumber = doc.getNumberOfPages();
    doc.setPage(finalPageNumber);

    const footerHeight = 38;
    doc.setFillColor(245, 245, 245);
    doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const footerContentSplit = doc.splitTextToSize(
      footerContent1,
      pageWidth - 20
    );

    // const footerContent2Split = doc.splitTextToSize(
    //   footerContent2,
    //   pageWidth - 20
    // );

    doc.text(footerContentSplit, 10, pageHeight - 28);
    //doc.text(footerContent2Split, 10, pageHeight - 36);
  };

  //----Start Generating

  generatePdfHeader();
  generatePdfCustomerInfo();

  autoTable(doc, {
    theme: tableTheme,
    headStyles: {
      fillColor: gridColor,
      textColor: "#333333",
      lineColor: "#D9D9D9",
      //gridColor: "#333333",
      lineWidth: 0.1,
    },
    columns: tableheader,
    body: tableData,
    tableLineColor: "#333333",
    startY: marginTopForTableData,
    //pageHeight: 50,
    columnStyles: { 1: { halign: "left" } },
    styles: { halign: "left" },
    didDrawPage: (data: any) => {
      heightOfTableperPage = data.cursor.y;
    },
  });

  if (heightOfTableperPage > estimatedAvailableSpaceForFooter) {
    doc.addPage();
    generateFooter();
  } else {
    generateFooter();
  }

  // Save the PDF
  doc.save(fileName);
};
