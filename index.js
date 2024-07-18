import fs from "fs";
import puppeteer from "puppeteer";
import dados from "./dados.js";

const executarDadosAntes = async () => {
    await dados();
    
    const credentialsJson = await JSON.parse(fs.readFileSync("arquivoPDF.json", "utf-8"));

    const inserirDados = async () => {
        
        for (const dados of credentialsJson) {
            try {
            
                const browser = await puppeteer.launch({
                    headless: false,
                });
                
                const page = await browser.newPage();
                await page.goto("http://127.0.0.1:5500/index.html");

                await page.waitForSelector("#name")
                await page.click("#name");
                await page.type("#name", dados.name);
                
                await page.waitForSelector("#address")
                await page.click("#address");
                await page.type("#address", dados.address);
                
                await page.waitForSelector("#phone")
                await page.click("#phone");
                await page.type("#phone", dados.phone);
                
                await page.waitForSelector("#birthday")
                await page.click("#birthday");
                await page.type("#birthday", dados.birthday);
                
                await page.waitForSelector("#emailAddress")
                await page.click("#emailAddress");
                await page.type("#emailAddress", dados.emailAddress);
                
                await page.waitForSelector("#bloodType")
                await page.click("#bloodType");
                await page.type("#bloodType", dados.bloodType);
                
                await page.waitForSelector("#height")
                await page.click("#height");
                await page.type("#height", dados.height);
                
                await page.waitForSelector("#weight")
                await page.click("#weight");
                await page.type("#weight", dados.weight);
                
                // await browser.close();
            }catch (error) {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            } 
        }
    }

    await inserirDados();
}

executarDadosAntes();


