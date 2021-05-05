function priceListFormatter(priceList) {
  if (!arguments.length || Array.isArray(arguments)) throw Error();

  // Group by prices
  let groupedList = priceList.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.price]) {
      acc[value.price] = [];
    }

    // Grouping
    acc[value.price].push({
      from: value.from,
      to: value.to,
    });

    return acc;
  }, {});

  // formattedList initialization
  let formattedList = [];

  // for every key in groupedList, sorted
  Object.keys(groupedList)
    .sort()
    .map((price) => {
      // format sentance for each price
      formattedList.push(
        Number(price).toFixed(1) +
          " : " +
          groupedList[price].map((x) => x.from + " to " + x.to).join(", ")
      );
    });

  console.log(formattedList);
}

module.exports = priceListFormatter;
