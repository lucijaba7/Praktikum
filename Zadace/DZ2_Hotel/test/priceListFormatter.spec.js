const { assert, expect } = require("chai");
const priceListFormatter = require("../index.js");
const sinon = require("sinon");
const data = require("../hotel_prices.json");

describe("PriceListFormatter problem", function () {
  it("priceListFormatter should be a function", function () {
    expect(priceListFormatter).to.be.a("function");
  });

  context("Input", function () {
    it("Should throw an error if no arguments.", function () {
      expect(() => priceListFormatter()).to.throw();
    });
    it("Should throw error ig argument is not an array", function () {
      expect(() => priceListFormatter(1).to.throw());
    });
  });

  context("Output", function () {
    beforeEach(() => {
      sinon.restore();
    });

    const log = sinon.spy(console, "log");
    priceListFormatter(data);
    const result = log.args[0][0];

    it("priceListFormatter should log an array", function () {
      expect(result).to.be.an("array");
    });

    it("priceListFormatter should log an array with a lenght of 3", function () {
      assert.equal(result.length, 3);
    });

    context("Result", function () {
      it('priceListFormatter should log an array with a string "34.5 : 2020-01-01 to 2020-02-01"', function () {
        expect(result).to.include("34.5 : 2020-01-01 to 2020-02-01");
      });
      it('priceListFormatter should log an array with a string "37.0 : 2020-02-02 to 2020-03-01, 2020-05-15 to 2020-06-15"', function () {
        expect(result).to.include(
          "37.0 : 2020-02-02 to 2020-03-01, 2020-05-15 to 2020-06-15"
        );
      });
      it('priceListFormatter should log an array with a string "39.0 : 2020-03-02 to 2020-05-15"', function () {
        expect(result).to.include("39.0 : 2020-03-02 to 2020-05-15");
      });
    });
  });
});
