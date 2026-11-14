const fs = require("fs/promises");
console.log("dsdfgsdgf");
async function readData() {

    try {

        const data = await fs.readFile("data.txt", "utf8");

        console.log(data);

    } catch (err) {

        console.log(err);

    }
}
console.log("d00000000000000000sdfgsdgf");

readData();