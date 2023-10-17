//  Creates an object with dates as keys and objects as values between the start and end dates of each project

// Helper function to convert a date string to a Date object
const toDate = (dateString) => new Date(dateString);

// Takes an array of projects and returns an object with dates as keys and objects as values
const generateProjectSetDays = (projects) => {
  let projectSetDays = {};

  projects.forEach((project) => {
    const start = toDate(project.startDate);
    const end = toDate(project.endDate); // Fixed from 'end' to 'endDate'
    const rate = project.cityType === "high" ? 85 : 75; // set rate based on cityType
    // loop over the days and add a new date for every date in the range
    for (
      let day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      // convert the date to a string
      const dayStr = day.toISOString().split("T")[0];
      if (!projectSetDays[dayStr]) {
        projectSetDays[dayStr] = { rate, city: project.cityType };
      } else {
        // Update the rate if the cityType is 'high'
        if (project.cityType === "high") {
          projectSetDays[dayStr].rate = rate;
          projectSetDays[dayStr].city = "high";
        }
      }
    }
  });
  // return an object with dates as keys and objects as values
  return projectSetDays;
};

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
