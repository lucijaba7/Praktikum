function isLeapYear(y) {
    return (!(y % 4) && (y % 100) || !(y % 400));
}
/*
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const acc = []
acc.push(0);
for (let i = 0; i < months.length; i++) {
    acc.push(acc[i] + months[i]);
}
console.log(months)
console.log(acc)
function dayOfYear(year, month, day) {
    if (!arguments.length) throw Error();

    if (isLeapYear(year) && month > 2) {
        return acc[month - 1] + day + 1;
    }
    return acc[month - 1] + day;
}
*/

function dayOfYear(year, month, day) {
    if (!arguments.length) throw Error();

    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let days = day;


    for (let i = 0; i < (month - 1); i++)
        days += monthDays[i]

    if (isLeapYear(year) && month > 2)
        days += 1;

    return days;
}

module.exports = dayOfYear