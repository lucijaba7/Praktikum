function fizzBuzz(n) {
    if(isNaN(n)) throw Error();
    let result = '';
    if (!(n % 3)) result += 'Fizz';
    if (!(n % 5)) result += 'Buzz';
    if (!(n % 7)) result += 'Suzz';
    return result;
};

module.exports = fizzBuzz