// Helper function to convert a date string to a Date object
const toDate = (dateString) => new Date(dateString);

// Takes an array of projects and returns an object with dates as keys and objects as values
const generateProjectSetDays = (projects) => {
  let projectSetDays = {};

  projects.forEach((project) => {
    const start = toDate(project.startDate);
    const end = toDate(project.endDate); // Fixed from 'end' to 'endDate'
    const rate = project.cityType === "high" ? 85 : 75; // Fixed from 'h' and 'l' to 'high' and 'low'

    for (
      let day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      const dayStr = day.toISOString().split("T")[0];
      if (!projectSetDays[dayStr]) {
        projectSetDays[dayStr] = { rate, city: project.cityType }; // Fixed to 'city'
      } else {
        // Update the rate if the cityType is 'high'
        if (project.cityType === "high") {
          projectSetDays[dayStr].rate = rate;
          projectSetDays[dayStr].city = "high"; // Fixed to 'city'
        }
      }
    }
  });

  return projectSetDays; // Added return
};

// const projectSet2 = [
//   { cityType: "low", startDate: "2015-09-01", endDate: "2015-09-01" },
//   { cityType: "high", startDate: "2015-09-02", endDate: "2015-09-06" },
//   { cityType: "low", startDate: "2015-09-06", endDate: "2015-09-08" },
// ];

// console.log(generateProjectSetDays(projectSet2));
