// Changes the rates charged based on the following rules:
// 1. If a date is next to a gap and the rate is 85, the rate is 55
// 2. If a date is next to a gap and the rate is 75, the rate is 45
// 3. If a project is next to a gap and the cityType is low, the rate is 45.  Similarly, if a project is next to a gap and the cityType is high, the rate is 55.

// Input: An object with dates as keys and objects as values
const changeRates = (daysObj) => {
  // Sort the dates
  const sortedDates = Object.keys(daysObj).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  // loop over the dates and check if the date is next to a gap
  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate = new Date(sortedDates[i + 1]);
    const prevDate = new Date(sortedDates[i - 1]);
    const gapToNext = (nextDate - currentDate) / (1000 * 60 * 60 * 24);
    const gapToPrev = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

    // Check if it's the first or last date or next to a gap
    if (
      i === 0 ||
      i === sortedDates.length - 1 ||
      gapToNext > 1 ||
      gapToPrev > 1
    ) {
      // determine rate
      if (daysObj[sortedDates[i]].rate === 85) {
        daysObj[sortedDates[i]].rate = 55;
      } else if (daysObj[sortedDates[i]].rate === 75) {
        daysObj[sortedDates[i]].rate = 45;
      }
    }
  }
  // return the object with the changed rates
  return daysObj;
};

module.exports = changeRates;
