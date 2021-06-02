const { ngramGenerator } = require("../../lib/ngramGenerator.js");
// const fs = require("fs");
const path = require("path");
var fs = require("fs");

const text = fs.readFileSync(path.resolve(__dirname, "./text.txt"), "utf-8");

// const reader = new FileReader();
// reader.readAsText("/text.txt", "UTF-8");

// console.log(reader);

// var text = "";
// fs.readFileSync("/text.txt", "utf8", function (err, data) {
//   text = data;
// });

// const text = "Whatever you say I am thats what I'am not";
const textBigram = ngramGenerator(text, 2);
const textTrigram = ngramGenerator(text, 3);

module.exports = { textBigram, textTrigram };
