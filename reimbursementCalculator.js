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

    console.log(`Total for set ${setTitles[index]}: ${setTotal}`);
  });

  console.log("Grand total rate:", grandTotal);
};

// Test data
// const data = [
//   {
//     "2010-09-03": { rate: 45, city: "low" },
//     "2010-09-04": { rate: 75, city: "low" },
//     "2010-09-05": { rate: 75, city: "low" },
//     "2010-09-06": { rate: 75, city: "low" },
//     "2010-09-07": { rate: 45, city: "low" },
//     "2012-08-09": { rate: 55, city: "high" },
//     "2012-08-10": { rate: 55, city: "high" },
//   },
//   {
//     "2010-09-08": { rate: 45, city: "low" },
//     "2010-09-09": { rate: 75, city: "low" },
//     "2010-09-10": { rate: 45, city: "low" },
//   },
// ];

// const setTitles = ["Cat 1", "Dog 2"];
// reimbursementCalculator(data, setTitles);

module.exports = reimbursementCalculator;
