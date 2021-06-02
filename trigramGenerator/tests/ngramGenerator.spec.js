const chai = require("chai");
const { expect } = chai;

const {
  ngramGenerator,
  generateChunks,
  interpunctionHandler,
  whitespaceHandler,
} = require("../lib/ngramGenerator.js");

const {
  getSuggestions,
  correctNgram,
  groupAndCount,
  generateText,
  getFirstWord,
  searchableValue,
} = require("../public/suggestTool.js");

const { textBigram, textTrigram } = require("../public/data/data.js");

describe("#ngramGenerator()", function () {
  it("should be a function", function () {
    expect(ngramGenerator).to.be.a("function");
  });

  it("should return an object", function () {
    // expect(ngramGenerator('')).to.be.an('object');
    expect(typeof ngramGenerator("", 3)).to.equal("object");
  });
  context("wrong input", function () {
    it("should throw error if no argument", function () {
      expect(() => ngramGenerator()).to.throw();
    });

    it("should throw error if argument is not a string", function () {
      expect(() => ngramGenerator(5)).to.throw();
      expect(() => ngramGenerator([])).to.throw();
      expect(() => ngramGenerator({})).to.throw();
    });
  });

  context("Trigram test", function () {
    it(`should return correct trigram for 2 words input`, function () {
      expect(ngramGenerator("I wish", 3)).to.eql(new Map());
    });
    it(`should return correct trigram for 3 words input`, function () {
      expect(ngramGenerator("I wish I", 3)).to.eql(
        new Map([["I wish", ["I"]]])
      );
    });
    it(`should return correct trigram for 4 words input`, function () {
      expect(ngramGenerator("I wish I may", 3)).to.eql(
        new Map([
          ["I wish", ["I"]],
          ["wish I", ["may"]],
        ])
      );
    });
    it(`should return correct trigram for 5 words input`, function () {
      expect(ngramGenerator("I wish I may I", 3)).to.eql(
        new Map([
          ["I wish", ["I"]],
          ["wish I", ["may"]],
          ["I may", ["I"]],
        ])
      );
    });
    it(`should return correct trigram for 6 words input`, function () {
      expect(ngramGenerator("I wish I may I wish", 3)).to.eql(
        new Map([
          ["I wish", ["I"]],
          ["wish I", ["may"]],
          ["I may", ["I"]],
          ["may I", ["wish"]],
        ])
      );
    });
    const sevenWordsInputTrigram = new Map([
      ["I wish", ["I", "I"]],
      ["wish I", ["may"]],
      ["I may", ["I"]],
      ["may I", ["wish"]],
    ]);
    it(`should return correct trigram for 7 words input`, function () {
      expect(ngramGenerator("I wish I may I wish I", 3)).to.eql(
        sevenWordsInputTrigram
      );
    });

    it(`should return correct trigram for 7 words with whitespace as input`, function () {
      expect(ngramGenerator("I wish\n I   may \tI \n\rwish I", 3)).to.eql(
        sevenWordsInputTrigram
      );
    });
  });

  context("Bigram test", function () {
    it(`should return correct bigram for 1 word input`, function () {
      expect(ngramGenerator("I", 2)).to.eql(new Map());
    });
    it(`should return correct bigram for 2 words input`, function () {
      expect(ngramGenerator("I wish", 2)).to.eql(new Map([["I", ["wish"]]]));
    });
    it(`should return correct bigram for 3 words input`, function () {
      expect(ngramGenerator("I wish I", 2)).to.eql(
        new Map([
          ["I", ["wish"]],
          ["wish", ["I"]],
        ])
      );
    });
    it(`should return correct trigram for 4 words input`, function () {
      expect(ngramGenerator("I wish I may", 2)).to.eql(
        new Map([
          ["I", ["wish", "may"]],
          ["wish", ["I"]],
        ])
      );
    });
  });

  context("text parsing", function () {
    it("should be letter capitalisation agnostic", function () {
      const text = "Evo neka bude netko";
      const initial = ngramGenerator(text, 3);
      const lowerCased = ngramGenerator(text.toLocaleLowerCase(), 3);
      expect(initial).to.eql(lowerCased);
    });

    it("should have pronoun 'I' correctly uppercase", function () {
      expect(ngramGenerator("Ivan with i or I", 3)).to.eql(
        new Map([
          ["ivan with", ["I"]],
          ["with I", ["or"]],
          ["I or", ["I"]],
        ])
      );
    });

    it("handles punctuation as a separate word", function () {
      expect(ngramGenerator("I am.", 3)).to.eql(new Map([["I am", ["."]]]));
      expect(ngramGenerator("I a@email.com.", 3)).to.eql(
        new Map([["I a@email.com", ["."]]])
      );
      expect(ngramGenerator("I am,", 3)).to.eql(new Map([["I am", [","]]]));
      expect(ngramGenerator("I am;", 3)).to.eql(new Map([["I am", [";"]]]));
      expect(ngramGenerator("I am:", 3)).to.eql(new Map([["I am", [":"]]]));
      expect(ngramGenerator("I am!", 3)).to.eql(new Map([["I am", ["!"]]]));
      expect(ngramGenerator("I am?", 3)).to.eql(new Map([["I am", ["?"]]]));
      expect(ngramGenerator("I am?!", 3)).to.eql(new Map([["I am", ["?!"]]]));
      expect(ngramGenerator("I am...", 3)).to.eql(new Map([["I am", ["..."]]]));
      expect(ngramGenerator('“Says: "I am?"[w](ok){1}.”', 3)).to.eql(
        new Map([
          ["“ says", [":"]],
          ["says :", ['"']],
          [': "', ["I"]],
          ['" I', ["am"]],
          ["I am", ["?"]],
          ["am ?", ['"']],
          ["am ?", ['"']],
          ['? "', ["["]],
          ['" [', ["w"]],
          ["[ w", ["]"]],
          ["w ]", ["("]],
          ["] (", ["ok"]],
          ["( ok", [")"]],
          ["ok )", ["{"]],
          [") {", ["1"]],
          ["{ 1", ["}"]],
          ["1 }", ["."]],
          ["} .", ["”"]],
        ])
      );
    });
  });
  describe("Helper functions", function () {
    describe("#whitespaceHandler()", function () {
      it("should return correct string", function () {
        expect(whitespaceHandler("I  wish")).to.equal("I wish");
        expect(whitespaceHandler("I\twish")).to.equal("I wish");
        expect(whitespaceHandler("I\nwish")).to.equal("I wish");
        expect(whitespaceHandler("I\r\nwish")).to.equal("I wish");
      });
    });

    describe("#interpunctionHandler()", function () {
      it("should return correct string", function () {
        expect(interpunctionHandler("I am.")).to.equal("I am .");
        expect(interpunctionHandler("I a@email.com.")).to.equal(
          "I a@email.com ."
        );
        expect(interpunctionHandler(",;:!??!...")).to.equal(", ; : ! ? ?! ...");
        expect(interpunctionHandler("“”‘’\"'`{}()[]")).to.equal(
          "“ ” ‘ ’ \" ' ` { } ( ) [ ]"
        );
      });
    });

    describe("#generateChunks()", function () {
      context("Chunks of 2", function () {
        it("should return correct array for less than 2 words input", function () {
          expect(generateChunks(["I"], 2)).to.eql([]);
        });

        it("should return correct array for 2 words input", function () {
          expect(generateChunks(["I", "wish"], 2)).to.eql([["I", "wish"]]);
        });

        it("should return correct array for 3 words input", function () {
          expect(generateChunks(["I", "wish", "I"], 2)).to.eql([
            ["I", "wish"],
            ["wish", "I"],
          ]);
        });
      });
      context("Chunks of 3", function () {
        it("should return correct array for less than 3 words input", function () {
          expect(generateChunks(["I", "wish"], 3)).to.eql([]);
        });

        it("should return correct array for 3 words input", function () {
          expect(generateChunks(["I", "wish", "I"], 3)).to.eql([
            ["I", "wish", "I"],
          ]);
        });

        it("should return correct array for 4 words input", function () {
          expect(generateChunks(["I", "wish", "I", "may"], 3)).to.eql([
            ["I", "wish", "I"],
            ["wish", "I", "may"],
          ]);
        });
      });
    });
  });
});

describe("#getSuggestions()", function () {
  it("should be a function", function () {
    expect(getSuggestions).to.be.a("function");
  });
  it("should throw error if no argument", function () {
    expect(() => getSuggestions()).to.throw();
  });
  it("should throw error if argument is not a string", function () {
    expect(() => getSuggestions(5)).to.throw();
  });
  it("should return an array", function () {
    expect(getSuggestions("a")).to.be.an("array");
  });
  it("should return correct array", function () {
    expect(getSuggestions("a")).to.eql([
      "few",
      "lot",
      "topic",
      "very",
      "little",
    ]);
  });
  describe("Helper functions", function () {
    context("#correctNgram()", function () {
      it("should return textBigram for 1 word input", function () {
        expect(correctNgram("one")).to.eql(textBigram);
      });
      it("should return textTrigram for 2 word input", function () {
        expect(correctNgram("one two")).to.eql(textTrigram);
      });

      it("should return textTrigram for 3 word input", function () {
        expect(correctNgram("one two three")).to.eql(textTrigram);
      });
    });
    context("#groupAndCount()", function () {
      let value = "princess";
      let result = new Map();
      result.set("and", 1);
      result.set("happy", 1);

      it("should return an object", function () {
        expect(typeof groupAndCount(value, correctNgram(value))).to.equal(
          "object"
        );
      });
      it("should group values and count their repetition", function () {
        expect(groupAndCount(value, correctNgram(value))).to.eql(result);
      });
    });
  });
});

describe("#generateText", function () {
  it("should be a function", function () {
    expect(generateText).to.be.a("function");
  });
  it("should throw error if no argument", function () {
    expect(() => generateText()).to.throw();
  });
  it("should throw error if argument is not a number", function () {
    expect(() => generateText("a")).to.throw();
  });
  it("should return a string", function () {
    expect(generateText(3)).to.be.a("string");
  });
  // describe("Helper functions", function () {
  //   context("#getFirstWord", function () {});
  // });
});

// const { assert, expect } = require("chai");
// const {
//   ngramGenerator,
//   getWords,
//   generateChunks,
//   generateTrigrams,
// } = require("../ngramGenerator");

// describe("ngramGenerator problem TDD", function () {
//   context("ngramGenerator", function () {
//     it("ngramGenerator should be a function", function () {
//       expect(ngramGenerator).to.be.a("function");
//     });

//     it("ngramGenerator should throw error if argument is not string", function () {
//       expect(() => ngramGenerator(1)).to.throw();
//     });

//     it("ngramGenerator should return correct trigram for less than 3 words", function () {
//       expect(ngramGenerator("I wish")).to.eql(new Map());
//     });

//     it("ngramGenerator should return correct trigram for 3 words input", function () {
//       expect(ngramGenerator("I wish I")).to.eql(new Map([["I wish", ["I"]]]));
//     });

//     it("ngramGenerator should return correct trigram for 4 words input", function () {
//       expect(ngramGenerator("I wish I may")).to.eql(
//         new Map([
//           ["I wish", ["I"]],
//           ["wish I", ["may"]],
//         ])
//       );
//     });

//     it("ngramGenerator should return correct trigram for 5 words input", function () {
//       expect(ngramGenerator("I wish I may I")).to.eql(
//         new Map([
//           ["I wish", ["I"]],
//           ["wish I", ["may"]],
//           ["I may", ["I"]],
//         ])
//       );
//     });

//     it("ngramGenerator should return correct trigram for 6 words input", function () {
//       expect(ngramGenerator("I wish I may I wish")).to.eql(
//         new Map([
//           ["I wish", ["I"]],
//           ["wish I", ["may"]],
//           ["I may", ["I"]],
//           ["may I", ["wish"]],
//         ])
//       );
//     });

//     it("ngramGenerator should return correct trigram for 7 words input", function () {
//       expect(ngramGenerator("I wish I may I wish I")).to.eql(
//         new Map([
//           ["I wish", ["I", "I"]],
//           ["wish I", ["may"]],
//           ["I may", ["I"]],
//           ["may I", ["wish"]],
//         ])
//       );
//     });
//     it("ngramGenerator should return correct trigram for text with multiple whitespaces", function () {
//       expect(ngramGenerator("I wish     I  may    I  wish I")).to.eql(
//         new Map([
//           ["I wish", ["I", "I"]],
//           ["wish I", ["may"]],
//           ["I may", ["I"]],
//           ["may I", ["wish"]],
//         ])
//       );
//     });
//   });

//   context("getWords", function () {
//     it("getWords should be a function", function () {
//       expect(getWords).to.be.a("function");
//     });
//     it("getWords should return an array", function () {
//       expect(getWords("I wish I may")).to.be.an("array");
//     });
//     context("Should handle whitespace correctly", function () {
//       it("should replace multiple whitespaces with single space", function () {
//         expect(getWords(" I    wish ")).to.eql(["I", "wish"]);
//       });

//       it("should replace \t with single space", function () {
//         expect(getWords("I\twish\t I")).to.eql(["I", "wish", "I"]);
//       });

//       it("should replace \n with single space", function () {
//         expect(getWords("\nI\nwish")).to.eql(["I", "wish"]);
//       });

//       it("should replace \r with single space", function () {
//         expect(getWords("I\r\rwish I\rmay")).to.eql(["I", "wish", "I", "may"]);
//       });

//       it("should replace \n\r with single space", function () {
//         expect(getWords("\n\rI wish   I \n\r may I wish")).to.eql([
//           "I",
//           "wish",
//           "I",
//           "may",
//           "I",
//           "wish",
//         ]);
//       });
//     });
//   });

//   context("generateChunks", function () {
//     it("generateChunks should return correct array for less than 3 words input", function () {
//       expect(generateChunks(["I", "wish"])).to.eql([]);
//     });
//     it("generateChunks should return correct array for 3 words input", function () {
//       expect(generateChunks(["I", "wish", "I"])).to.eql([["I", "wish", "I"]]);
//     });
//     it("generateChunks should return correct array for 4 words input", function () {
//       expect(generateChunks(["I", "wish", "I", "may"])).to.eql([
//         ["I", "wish", "I"],
//         ["wish", "I", "may"],
//       ]);
//     });
//   });
// });

// it("handles dot(.) as a separate word", function () {
//   expect(ngramGenerator("I am.")).to.eql(new Map([["I am", ["."]]]));
// });

// // Zadaća, implementirati funkcionalnost za točku i ostalu interpunkciju
