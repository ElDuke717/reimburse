const changeRates = (daysObj) => {
  // Sort the dates
  const sortedDates = Object.keys(daysObj).sort(
    (a, b) => new Date(a) - new Date(b)
  );

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
      if (daysObj[sortedDates[i]].rate === 85) {
        daysObj[sortedDates[i]].rate = 55;
      } else if (daysObj[sortedDates[i]].rate === 75) {
        daysObj[sortedDates[i]].rate = 45;
      }
    }
  }

  return daysObj;
};

const projectDays = {
  "2015-09-01": { rate: 75, city: "low" },
  "2015-09-02": { rate: 85, city: "high" },
  "2015-09-03": { rate: 85, city: "high" },
  "2015-09-04": { rate: 85, city: "high" },
  "2015-09-05": { rate: 85, city: "high" },
  "2015-09-06": { rate: 85, city: "high" },
  "2015-09-07": { rate: 75, city: "low" },
  "2015-09-08": { rate: 75, city: "low" },
};

const projectDays2 = {
  "2015-09-01": { rate: 75, city: "low" },
  "2015-09-03": { rate: 85, city: "high" },
  "2015-09-04": { rate: 85, city: "high" },
  "2015-09-05": { rate: 55, city: "high" },
  "2015-09-07": { rate: 75, city: "low" },
  "2015-09-08": { rate: 75, city: "low" },
  "2015-09-09": { rate: 75, city: "low" },
  "2015-09-11": { rate: 85, city: "high" },
  "2015-09-12": { rate: 85, city: "high" },
  "2015-09-13": { rate: 85, city: "high" },
  "2015-09-14": { rate: 85, city: "high" },
};

console.log(changeRates(projectDays2));
