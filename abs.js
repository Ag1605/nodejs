const fs = require("fs");

// Create a file and write content
fs.writeFileSync("demo.txt", "Hello Node.js");
// Read the file
const data = fs.readFileSync("demo.txt", "utf8");

console.log(data);