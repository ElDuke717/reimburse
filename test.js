const toDate = (dateString) => new Date(dateString);

const calculateReimbursement = (projects) => {
  let days = {};

  // First loop to populate the days object
  projects.forEach((project) => {
    const start = toDate(project.startDate);
    const end = toDate(project.endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dStr = d.toISOString().split("T")[0];
      if (!days[dStr]) {
        days[dStr] = {
          rate: project.city === "high" ? 85 : 75,
          city: project.city,
        };
      } else {
        days[dStr].rate = Math.max(
          days[dStr].rate,
          project.city === "high" ? 85 : 75
        );
        days[dStr].city = project.city === "high" ? "high" : days[dStr].city;
      }
    }
  });

  // Convert days object to sorted array
  const sortedDays = Object.keys(days).sort();

  // Second loop to modify rates for travel days
  for (let i = 0; i < sortedDays.length; i++) {
    if (
      i === 0 ||
      i === sortedDays.length - 1 ||
      toDate(sortedDays[i + 1]).getDate() - toDate(sortedDays[i]).getDate() >
        1 ||
      toDate(sortedDays[i]).getDate() - toDate(sortedDays[i - 1]).getDate() > 1
    ) {
      days[sortedDays[i]].rate = Math.min(
        days[sortedDays[i]].rate,
        days[sortedDays[i]].city === "high" ? 55 : 45
      );
    }
  }

  // Final calculation
  return Object.values(days).reduce((acc, day) => acc + day.rate, 0);
};

const projectSet1 = [
  { city: "low", startDate: "2015-09-01", endDate: "2015-09-01" },
];

const projectSet2 = [
  { city: "low", startDate: "2015-09-01", endDate: "2015-09-01" },
  { city: "high", startDate: "2015-09-02", endDate: "2015-09-06" },
  { city: "low", startDate: "2015-09-06", endDate: "2015-09-08" },
];

console.log(
  "Total reimbursement for set 1:",
  calculateReimbursement(projectSet1)
);
console.log(
  "Total reimbursement for set 2:",
  calculateReimbursement(projectSet2)
);

/*
const projectSetDays = [
    2015-09-01: { rate: 75, city: 'low' },
    2015-09-02: { rate: 85, city: 'high' },
    2015-09-03: { rate: 85, city: 'high' },
    2015-09-04: { rate: 85, city: 'high' },
    2015-09-05: { rate: 85, city: 'high' },
    2015-09-06: { rate: 75, city: 'low' },
    2015-09-07: { rate: 75, city: 'low' },
    2015-09-08: { rate: 75, city: 'low' }
]



*/
