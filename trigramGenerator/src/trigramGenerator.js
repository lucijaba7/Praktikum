function trigramGenerator(text) {
  if (typeof text !== "string") throw new Error();

  let words = text.split(" ");
  let chunks = generateChunks(words);

  return generateTrigrams(chunks);
}

function generateChunks(words) {
  let result = [];
  words.slice(0, words.length - 2).forEach((_word, i) => {
    result.push(words.slice(i, i + 3));
  });
  return result;
}

function generateTrigrams(words) {
  return words.reduce((acc, value) => {
    let key = value[0] + " " + value[1];
    if (!acc.has(key)) acc.set(key, []);
    acc.get(key).push(value[2]);
    return acc;
  }, new Map());
}

trigramGenerator("I wish");

module.exports = { trigramGenerator, generateChunks };
