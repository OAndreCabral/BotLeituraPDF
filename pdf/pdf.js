const readline = require("readline");
const fs = require("fs");

const line = readline.createInterface({
    input: fs.createReadStream("./livros/hp.pdf")
});

line.on("line", (data) => {
    let pdf = data.split(",")
    console.log('====================================');
    console.log(pdf);
    console.log('====================================');
});
