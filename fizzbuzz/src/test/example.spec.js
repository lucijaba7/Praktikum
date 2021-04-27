const { assert, expect } = require("chai");
const fizzBuzz = require("../fizzBuzz");

describe('fizz buzz problem', function() {
    it('fizzBuzz should be a functioin', function() {
        fizzBuzz()
    });
    it('function should accept number as an argument', function() {
        fizzBuzz(1);
    });
    it('should return Fizz if number is dividible by 3', function() {
        expect(fizzBuzz(3)).to.equal('Fizz');
        expect(fizzBuzz(6)).to.equal('Fizz');
    });
    it('should return Buzz if number is dividible by 5', function() {
        expect(fizzBuzz(5)).to.equal('Buzz');
    });
    it('should return FizBuzz if number is dividible by 3 & 5', function() {
        expect(fizzBuzz(15)).to.equal('FizzBuzz');
    });
    it('should return empty string if number is not dividible by 3 or 5', function() {
        expect(fizzBuzz(4)).to.equal('');
    });
})