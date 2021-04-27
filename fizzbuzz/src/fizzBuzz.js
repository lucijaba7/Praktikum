function fizzBuzz(n) {
    let result = '';
    if (!(n % 3)) result += 'Fizz';
    if (!(n % 5)) result += 'Buzz';
    return result;
};

module.exports = fizzBuzz