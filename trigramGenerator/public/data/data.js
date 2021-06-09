const { ngramGenerator } = require("../../lib/ngramGenerator.js");
var fs = require("fs");

const text = fs.readFileSync(`${__dirname}/text.txt`, "utf8");

const textBigram = ngramGenerator(text, 2);
const textTrigram = ngramGenerator(text, 3);

module.exports = { textBigram, textTrigram };
