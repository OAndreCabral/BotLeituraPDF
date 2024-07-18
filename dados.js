import fs from "fs";
import PDFParser from "pdf2json";

const files = fs.readdirSync("arquivoPDF", "utf-8");

let dadosArray = [];

const dados = async () => {

    await Promise.all(files.map(async (file) => {
        
        let pdfParser = new PDFParser(this, 1);

        pdfParser.loadPDF(`./arquivoPDF/${file}`);

        let dadosInfo = await new Promise(async (resolve, _reject) => {

            pdfParser.on("pdfParser_dataReady", (pdfDados) => {

                const linha = pdfParser.getRawTextContent().replace(/\r\n/g, " ");

                resolve({
                    name: /Name\s(.*?)Address/i.exec(linha)[1].trim(),
                    address: /Address\s(.*?)Phone/i.exec(linha)[1].trim(),
                    phone: /Phone\s(.*?)Birthday/i.exec(linha)[1].trim(),
                    birthday: /Birthday\s(.*?)Email\sAddress/i.exec(linha)[1].trim(),
                    emailAddress: /Email\sAddress\s(.*?)Blood\stype/i.exec(linha)[1].trim(),
                    bloodType: /Blood\stype\s(.*?)Height/i.exec(linha)[1].trim(),
                    height: /Height\s(.*?)Weight/i.exec(linha)[1].trim(),
                    weight: /Weight\s(.*?)--/i.exec(linha)[1].trim()
                });
            });
        });

        dadosArray.push(dadosInfo);
    }));

    fs.writeFileSync("arquivoPDF.json", JSON.stringify(dadosArray));
}

export default dados;