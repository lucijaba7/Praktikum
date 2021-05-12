const { assert, expect } = require("chai");
const { trigramGenerator, generateChunks } = require("../trigramGenerator");

describe("trigramGenerator problem TDD", function () {
  context("trigramGenerator", function () {
    it("trigramGenerator should be a function", function () {
      expect(trigramGenerator).to.be.a("function");
    });

    it("trigramGenerator should throw error if argument is not string", function () {
      expect(() => trigramGenerator(1)).to.throw();
    });

    it("trigramGenerator should return correct trigram for less than 3 words", function () {
      expect(trigramGenerator("I wish")).to.eql(new Map());
    });

    it("trigramGenerator should return correct trigram for 3 words input", function () {
      expect(trigramGenerator("I wish I")).to.eql(new Map([["I wish", ["I"]]]));
    });

    it("trigramGenerator should return correct trigram for 4 words input", function () {
      expect(trigramGenerator("I wish I may")).to.eql(
        new Map([
          ["I wish", ["I"]],
          ["wish I", ["may"]],
        ])
      );
    });

    it("trigramGenerator should return correct trigram for 5 words input", function () {
      expect(trigramGenerator("I wish I may I")).to.eql(
        new Map([
          ["I wish", ["I"]],
          ["wish I", ["may"]],
          ["I may", ["I"]],
        ])
      );
    });

    it("trigramGenerator should return correct trigram for 6 words input", function () {
      expect(trigramGenerator("I wish I may I wish")).to.eql(
        new Map([
          ["I wish", ["I"]],
          ["wish I", ["may"]],
          ["I may", ["I"]],
          ["may I", ["wish"]],
        ])
      );
    });

    it("trigramGenerator should return correct trigram for 7 words input", function () {
      expect(trigramGenerator("I wish I may I wish I")).to.eql(
        new Map([
          ["I wish", ["I", "I"]],
          ["wish I", ["may"]],
          ["I may", ["I"]],
          ["may I", ["wish"]],
        ])
      );
    });
  });

  context("generateChunks", function () {
    it("generateChunks should return correct array for less than 3 words input", function () {
      expect(generateChunks(["I", "wish"])).to.eql([]);
    });
    it("generateChunks should return correct array for 3 words input", function () {
      expect(generateChunks(["I", "wish", "I"])).to.eql([["I", "wish", "I"]]);
    });
    it("generateChunks should return correct array for 4 words input", function () {
      expect(generateChunks(["I", "wish", "I", "may"])).to.eql([
        ["I", "wish", "I"],
        ["wish", "I", "may"],
      ]);
    });
  });
});
