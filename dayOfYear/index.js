function isLeapYear(y) {
    return (!(y % 4) && (y % 100) || !(y % 400));
}

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