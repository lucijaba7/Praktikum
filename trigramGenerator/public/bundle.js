(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [function (require, module, exports) {}, {}],
    2: [
      function (require, module, exports) {
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
          return words
            .slice(0, words.length - (number - 1))
            .reduce((arr, word, i) => {
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
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        const { ngramGenerator } = require("../lib/ngramGenerator.js");
        // const fs = require("fs");

        var fs = require("fs");

        // const text = fs.readFile(`public/text.txt`, (err, data) => {
        //   if (err) throw err;

        //   console.log(data.toString());
        // });

        const reader = new FileReader();
        reader.readAsText("/text.txt", "UTF-8");

        console.log(reader);

        var text = "";
        fs.readFileSync("/text.txt", "utf8", function (err, data) {
          text = data;
        });

        // const text = "Whatever you say I am thats what I'am not";
        const textBigram = ngramGenerator(text, 2);
        const textTrigram = ngramGenerator(text, 3);

        module.exports = { textBigram, textTrigram };
      },
      { "../lib/ngramGenerator.js": 2, fs: 1 },
    ],
    4: [
      function (require, module, exports) {
        const { textBigram, textTrigram } = require("./data/data.js");

        /*-------- OUTPUT FOR SUGGESTIONS -------*/
        window.getOutput = function (value) {
          console.log(value);
          document.getElementById("outputText").innerHTML =
            getSuggestions(value);
        };

        /*------------ GET SUGGESTIONS -----------*/

        function getSuggestions(value) {
          if (typeof value !== "string") throw new Error();

          let a = correctNgram(value);

          const groupedValues = groupAndCount(value, correctNgram(value));
          const sortedGroup = [...groupedValues].sort((a, b) =>
            a[1] < b[1] ? 1 : -1
          );
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

        module.exports = { getSuggestions };
      },
      { "./data.js": 3 },
    ],
  },
  {},
  [4]
);
