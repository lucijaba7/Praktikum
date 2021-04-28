const { assert, expect } = require("chai");
const priceListFormatter = require("../index.js");
const data = require('../hotel_prices.json')

describe('PriceListFormatter problem', function () {
    it('priceListFormatter should be a function', function () { 
        expect(priceListFormatter).to.be.a('function'); 
    });
    it('Should throw an error if no arguments.', function(){
        expect(()=> priceListFormatter()).to.throw();
    });
    it('priceListFormatter should return an array', function () { 
        expect(priceListFormatter(data)).to.be.an('array');
    });
    it('priceListFormatter should return an array with a string "34.5 : 2020-01-01 to 2020-02-01"', function () {
        expect(priceListFormatter(data)).to.include("34.5 : 2020-01-01 to 2020-02-01");
    });
    it('priceListFormatter should return an array with a string "37 : 2020-02-02 to 2020-03-01, 2020-05-15 to 2020-06-15"', function () {
        expect(priceListFormatter(data)).to.include("37 : 2020-02-02 to 2020-03-01, 2020-05-15 to 2020-06-15");
    });
    it('priceListFormatter should return an array with a string "39 : 2020-03-02 to 2020-05-15"', function () {
        expect(priceListFormatter(data)).to.include("39 : 2020-03-02 to 2020-05-15");
    });
    it('priceListFormatter should return an array with a lenght: 3', function () {
        assert.equal(priceListFormatter(data).length, 3);
    });
})