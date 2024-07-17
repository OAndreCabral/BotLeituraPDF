const readline = require("readline");
const fs = require("fs");

const line = readline.createInterface({
    input: fs.createReadStream("teste.pdf")
});

line.on("line", (data) => {
    let pdf = data.split(";")
    console.log('====================================');
    console.log(pdf);
    console.log('====================================');
});
