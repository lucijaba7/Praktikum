function isLeapYear(y) {
    return (!(y % 4) && (y % 100) || !(y % 400));
}

//BOLJE UMJESTO OVOG NAPRAVIT POLJE [31, 28, ...]
function daysOfMonth(m, y) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(m))
        return 31;
    if ([4, 6, 9, 11].includes(m))
        return 30;
    if (m == 2) {
        return isLeapYear(y) ? 29 : 28;
    }
    //throw Error();
}

function dayOfYear(year, month, day) {
    if (!arguments.length) throw Error();

    let days = day;

    let i = 1;
    while (i != month) {
        days += daysOfMonth(i, year);
        i++;
    }

    return days;
}

module.exports = dayOfYear