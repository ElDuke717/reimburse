
// Helper function to convert a date string to a Date object
const toDate = (dateString) => new Date(dateString);

// const projectSet2 = [
//   { cityType: "low", startDate: "2015-09-01", endDate: "2015-09-01" },
//   { cityType: "high", startDate: "2015-09-02", endDate: "2015-09-06" },
//   { cityType: "low", startDate: "2015-09-06", endDate: "2015-09-08" },
// ];


// Takes an array of projects and returns an object with dates as keys and objects as values
// will return an object with dates as keys and objects as values
const generateProjectSetDays = (projects) => {
  let projectSetDays = {};

  projects.forEach((project) => {
    const start = toDate(project.startDate);
    const end = toDate(project.end); // Note: it's 'end', not 'endDate'
    const rate = project.cityType === "h" ? 85 : 75; // Note: 'h' and 'l'

    for (
      let day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      const dayStr = day.toISOString().split("T")[0];
      if (!projectSetDays[dayStr]) {
        projectSetDays[dayStr] = { rate, cityType: project.cityType };
      } else {
        // Update the rate if the cityType is 'h'
        if (project.cityType === "h") {
          projectSetDays[dayStr].rate = rate;
          projectSetDays[dayStr].cityType = "h";
        }
      }
    }
  });

  return projectSetDays;
};

// Example usage
//console.log(generateProjectSetDays(projectSet3));

// const projectSetDays = generateProjectSetDays(projectSet2);
// console.log(projectSetDays);

module.exports = generateProjectSetDays;

/*
{
  '2015-09-01': { rate: 45, city: 'low' },
  '2015-09-02': { rate: 85, city: 'high' },
  '2015-09-03': { rate: 85, city: 'high' },
  '2015-09-04': { rate: 85, city: 'high' },
  '2015-09-05': { rate: 85, city: 'high' },
  '2015-09-06': { rate: 85, city: 'high' },
  '2015-09-07': { rate: 75, city: 'low' },
  '2015-09-08': { rate: 45, city: 'low' }
}

OR

{
  '2015-09-01': { rate: 45, city: 'low' },
  '2015-09-03': { rate: 55, city: 'high' },
  '2015-09-04': { rate: 85, city: 'high' },
  '2015-09-05': { rate: 55, city: 'high' },
  '2015-09-07': { rate: 45, city: 'low' },
  '2015-09-08': { rate: 75, city: 'low' },
  '2015-09-09': { rate: 45, city: 'low' },
  '2015-09-11': { rate: 55, city: 'high' },
  '2015-09-12': { rate: 85, city: 'high' },
  '2015-09-13': { rate: 85, city: 'high' },
  '2015-09-14': { rate: 55, city: 'high' },  
}

*/
