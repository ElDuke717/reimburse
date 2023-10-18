// reimbursementCalculator(data) takes in the rate data (arrray of objects) and setTitles (array of strings)
const reimbursementCalculator = (rateData, setTitles) => {
  let grandTotal = 0; // To hold the grand total of all rates

  // Loop through each object in the array
  rateData.forEach((item, index) => {
    let setTotal = 0; // To hold the total for each set (individual object in the array)

    // Loop through each date in the object
    for (const [date, info] of Object.entries(item)) {
      // Add the rate for this date to the set total
      setTotal += info.rate;

      // Add the rate for this date to the grand total
      grandTotal += info.rate;
    }

    console.log(`Total for set ${setTitles[index]}: $${setTotal}`);
  });

  console.log("Grand total rate: $", grandTotal);
};

module.exports = reimbursementCalculator;
