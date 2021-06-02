function ngramGenerator(text, number) {
  if (typeof text !== "string") throw new Error();

  const words = textParser(text);
  const chunks = generateChunks(lowerCaseExceptPronounI(words), number);

  return generateNgrams(chunks);
}

function lowerCaseExceptPronounI(words) {
  return words.map((word) =>
    word.toLowerCase().replace(/(?<=\b)i(?=\b)/g, "I")
  );
}

function textParser(text) {
  const interpunctionReactText = interpunctionHandler(text);
  return whitespaceHandler(interpunctionReactText).split(" ");
}

function interpunctionHandler(text) {
  return text
    .replace(/(?:(?:\.{3}|\?!|[,;:.!?])\B|[“”‘’"'`{}()[\]])/g, " $& ")
    .replace(/\s+/g, " ")
    .trim();
}

function whitespaceHandler(text) {
  return text.replace(/\s+/g, " ").trim();
}

function generateChunks(words, number) {
  return words.slice(0, words.length - (number - 1)).reduce((arr, word, i) => {
    arr.push(words.slice(i, i + number));
    return arr;
  }, []);
}

function generateNgrams(words) {
  return words.reduce((acc, value) => {
    let val = value.pop();
    let key = value.join(" ");
    acc.has(key) ? acc.get(key).push(val) : acc.set(key, [val]);
    return acc;
  }, new Map());
}

module.exports = {
  ngramGenerator,
  generateChunks,
  interpunctionHandler,
  whitespaceHandler,
};
