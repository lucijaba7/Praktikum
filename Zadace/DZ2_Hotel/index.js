const data = require('./hotel_prices.json')

function priceListFormatter(priceList) {
  if (!arguments.length) throw Error();

  // Group by prices
  let groupedList = priceList.reduce((acc, value) => {
    // Group initialization
    if(!acc[value.price]){
      acc[value.price] = [];
    }
    
    // Grouping
    acc[value.price].push(value);

    return acc;
  }, {});
  
  // formattedList initialization
  let formattedList = [];

  // for every key in groupedList, sorted
  for (let price of Object.keys(groupedList).sort()){
    // format sentance for each price
    formattedList.push(price + ' : ' + groupedList[price].map(x => x.from + ' to ' + x.to).join(', '))
  }

  return formattedList
}


module.exports = priceListFormatter;