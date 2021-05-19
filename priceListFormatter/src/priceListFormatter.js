function priceListFormatter(priceList) {
  if (!arguments.length || Array.isArray(arguments)) throw Error();

  // Group by prices
  let groupedList = groupList(priceList);
  let formattedList = outputFormatter(groupedList);

  console.log(formattedList);
}

function groupList(list) {
  return list.reduce((acc, value) => {
    // Group initialization
    acc[value.price] = acc[value.price] || [];

    // Grouping
    acc[value.price].push({
      from: value.from,
      to: value.to,
    });

    return acc;
  }, {});
}

function outputFormatter(groupedList) {
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
  return formattedList;
}

module.exports = priceListFormatter;
