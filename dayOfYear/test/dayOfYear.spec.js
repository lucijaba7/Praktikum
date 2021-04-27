const { assert, expect } = require("chai");
const dayOfYear = require("../index.js");

describe('DayOfYear problem', function(){
    it('DayOfYear should be a functioin', function() {
        expect(dayOfYear).to.be.a('function');
    });
    it('Should throw an error if no arguments.', function(){
        expect(()=> dayOfYear()).to.throw();
    });
    it('Should return 1 for 01.01.2000', function(){
        expect(dayOfYear(2000, 1, 1)).to.equal(1);
    });
    it('Should return 2 for 02.01.2000', function(){
        expect(dayOfYear(2000, 1, 2)).to.equal(2);
    });
    it('Should return 32 for 01.02.2000', function(){
        expect(dayOfYear(2000, 2, 1)).to.equal(32);
    });
    it('Should return 31 for 01.02.1999', function(){
        expect(dayOfYear(1999, 2, 1)).to.equal(32);
    });
    it('Should return 61 for 01.03.2000', function(){
        expect(dayOfYear(2000, 3, 1)).to.equal(61);
    });
    it('Should return 92 for 01.04.2000', function(){
        expect(dayOfYear(2000, 4, 1)).to.equal(92);
    });
    it('Should return 136 for 15.05.2000', function(){
        expect(dayOfYear(2000, 5, 15)).to.equal(136);
    });

});