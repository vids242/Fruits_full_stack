const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

// Construct absolute paths to font files
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {
    const docDefinition = {
        content: [
            {
                image: './src/utils/Image/logo11.png',
                width: 170,
                height: 150,
                margin: [0, 0, 0, 30]
            },
            {
                text: 'Invoice',
                style: 'header',
                alignment: "center",
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 10]
            },
            {
                columns: [
                    {
                        width: '*',
                        text: [
                            { text: 'Name: ', bold: true }, 'Vraj\n',
                            { text: 'Address: ', bold: true }, 'Surat\n',
                            { text: 'Email: ', bold: true }, 'vrajd2602@gmail.com\n',
                            { text: 'Phone no: ', bold: true }, '9987239879\n'
                        ]
                    }
                ]

            },
            { text: '\n' },
            {
                table: {
                    
                    body: [
                        ['sr No', 'Items', 'Quantity', 'Price', 'Total Price'],
                        ['1', 'apple 15 pro', '1', '50000', '50000'],
                        ['2', 'cover', '2', '1000', '2000'],
                        [{ text: 'Total Amount', bold: true, colSpan: 4, alignment: 'center' }, {}, {}, {}, { text: '52000', bold: true }]
                    ]
                },

            },



        ],
        styles: {
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableOpacityExample: {
                    margin: [0, 5, 0, 15],
                    fillColor: 'blue',
                    fillOpacity: 0.3
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                // alignment: 'justify'
            },
            patterns: {
                stripe45d: {
                    boundingBox: [1, 1, 4, 4],
                    xStep: 3,
                    yStep: 3,
                    pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
                }
            }
        }
    };

    // Construct the absolute path for the output PDF
    const outputPath = path.join(__dirname, '../../../../../Fruits_full_stack/backend/ecommers/document.pdf');

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;
