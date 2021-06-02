"use strict";
const readline = require("readline");
const { getSuggestions, generateText } = require("../public/suggestTool.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter 1 or 2 words to get suggestions: ", (value) => {
      console.log("SUGGESTIONS: ");
      console.log(getSuggestions(value));
      resolve();
    });
  });
};

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question("How many words in a random text? ", (num) => {
      console.log("RANDOM TEXT OF THE DAY: ");
      console.log(generateText(num));

      resolve();
    });
  });
};

const main = async () => {
  await question1();
  await question2();
  rl.close();
};

main();
