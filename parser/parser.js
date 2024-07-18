const fs = require("fs");
const PDFParser = require("pdf2json");

const files = fs.readdirSync("artigos");

let artigos = [];

(async () => {
    await Promise.all(files.map(async (file) => {

        let pdfParser = new PDFParser(this, 1);

        pdfParser.loadPDF(`./artigos/${file}`);

        let artigo = await new Promise(async (resolve, reject) => {
            
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                
                resolve({
                    name: /Name\s(.*?)Address/i.exec(raw)[1].trim(),
                    address: /Address\s(.*?)Phone/i.exec(raw)[1].trim(),
                    phone: /Phone\s(.*?)Birthday/i.exec(raw)[1].trim(),
                    birthday: /Birthday\s(.*?)Email\sAddress/i.exec(raw)[1].trim(),
                    emailAddress: /Email\sAddress\s(.*?)Blood\stype/i.exec(raw)[1].trim(),
                    bloodType: /Blood\stype\s(.*?)Height/i.exec(raw)[1].trim(),
                    height: /Height\s(.*?)Weight/i.exec(raw)[1].trim(),
                    weight: /Weight\s(.*?)--/i.exec(raw)[1].trim()
                });
            });
        });

        artigos.push(artigo);
        
    }));

    fs.writeFileSync("artigos.json", JSON.stringify(artigos));
    
})();
