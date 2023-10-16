const toDate = (dateString) => new Date(dateString);

const projectSet2 = [
  { city: "low", startDate: "2015-09-01", endDate: "2015-09-01" },
  { city: "high", startDate: "2015-09-02", endDate: "2015-09-06" },
  { city: "low", startDate: "2015-09-06", endDate: "2015-09-08" },
];

const generateProjectSetDays = (projects) => {
  let projectSetDays = {};

  projects.forEach((project) => {
    const start = toDate(project.startDate);
    const end = toDate(project.endDate);
    const rate = project.city === "high" ? 85 : 75;

    for (
      let day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      const dayStr = day.toISOString().split("T")[0];
      if (!projectSetDays[dayStr]) {
        projectSetDays[dayStr] = { rate, city: project.city };
      } else {
        // Update the rate if the city is 'high'
        if (project.city === "high") {
          projectSetDays[dayStr].rate = rate;
          projectSetDays[dayStr].city = "high";
        }
      }
    }
  });

  return projectSetDays;
};

const projectSetDays = generateProjectSetDays(projectSet2);
console.log(projectSetDays);

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
