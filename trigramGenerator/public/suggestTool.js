const { textBigram, textTrigram } = require("./data/data.js");

/*------------ GET SUGGESTIONS -----------*/

// function getOutput(value) {
//   console.log(value);
//   document.getElementById("outputText").innerHTML = getSuggestions(value);
// }

function getSuggestions(value) {
  if (typeof value !== "string") throw new Error();

  const groupedValues = groupAndCount(value, correctNgram(value));
  const sortedGroup = [...groupedValues].sort((a, b) => (a[1] < b[1] ? 1 : -1));
  const mostCommonValues = sortedGroup.slice(0, 5).map((x) => x[0]);

  return mostCommonValues;
}

function correctNgram(value) {
  return value.includes(" ") ? textTrigram : textBigram;
}

function groupAndCount(value, ngram) {
  return ngram.has(value)
    ? ngram.get(value).reduce((acc, value) => {
        return acc.has(value)
          ? acc.set(value, acc.get(value) + 1)
          : acc.set(value, 1);
      }, new Map())
    : new Map();
}

/*------------ RANDOM TEXT -----------*/

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// Array.prototype.removeDot = function () {
//   return this.filter((x) => x != ".");
// };

function generateText(number) {
  if (typeof number !== "number") throw new Error();

  let fullSentence = getFullSentence(getFirstWord(), number).join(" ");
  return (fullSentence.charAt(0).toUpperCase() + fullSentence.slice(1)).concat(
    "."
  );
}

function getFirstWord() {
  const firstWords = textBigram.get(".");
  return firstWords.random();
}

function getFullSentence(firstWord, number) {
  let sentence = [firstWord];
  while (sentence.length != number) {
    const newWord = findWord(
      searchableValue(sentence, sentence.length).join(" ")
    );
    sentence.push(newWord);
  }

  return sentence;
}

function findWord(value) {
  return correctNgram(value).has(value)
    ? correctNgram(value).get(value).random()
    : [];
}

function searchableValue(words, length) {
  return length == 1 ? [words[0]] : words.slice(length - 2, length);
}

module.exports = {
  getSuggestions,
  correctNgram,
  groupAndCount,
  generateText,
  getFirstWord,
  searchableValue,
};
