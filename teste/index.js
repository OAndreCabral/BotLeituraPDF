const puppeteer = require("puppeteer");
const fs = require("fs");

const credentialsJson = JSON.parse(fs.readFileSync("teste.json", "utf-8"));

(async () => {
    try {

        for (let credentials of credentialsJson) {

            const browser = await puppeteer.launch({
                headless: false,
            });
            const page = await browser.newPage();
            await page.goto("https://github.com/");


            await page.waitForSelector('[href="/login"]')
            await page.click('[href="/login"]');

            //encontrado pelo texto do campo
            await page.waitForSelector("text=Username or email address");
            await page.click("text=Username or email address");
            await page.type("text=Username or email address", credentials.email);

            //encontrado pelo tipo
            await page.waitForSelector("[type='password']");
            await page.click("[type='password']");
            await page.type("[type='password']", credentials.senha);

            //encontrado pelo value
            await page.waitForSelector("[value='Sign in']");
            await page.click("[value='Sign in']");

            // await browser.close();
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
})();