const projectSets1 = [
  {
    setName: 1,
    projects: [
      {
        name: "Project 1",
        startDate: "09-01-2015",
        endDate: "09-03-2015",
        cityType: "low",
      },
      {
        name: "Project 2",
        startDate: "09-05-2015",
        endDate: "09-10-2015",
        cityType: "low",
      },
    ],
  },
  {
    setName: 2,
    projects: [
      {
        name: "Project 1",
        startDate: "10-01-2015",
        endDate: "10-03-2015",
        cityType: "high",
      },
      {
        name: "Project 2",
        startDate: "11-05-2015",
        endDate: "11-10-2015",
        cityType: "low",
      },
      {
        name: "Project 3",
        startDate: "11-13-2015",
        endDate: "11-20-2015",
        cityType: "low",
      },
    ],
  },
];

// Convert date format from MM-DD-YYYY to YYYY-MM-DD
function convertDateFormat(date) {
  const [month, day, year] = date.split("-");
  return `${year}-${month}-${day}`;
}

function convertProjectSets(projectSets1) {
  const newFormat = [];

  projectSets1.forEach(({ projects }) => {
    const newArray = projects.map(({ startDate, endDate, cityType }) => {
      return {
        cityType,
        startDate: convertDateFormat(startDate),
        endDate: convertDateFormat(endDate),
      };
    });

    newFormat.push(newArray);
  });

  return newFormat;
}

// const projectSetsInNewFormat = convertProjectSets(projectSets1);
// console.log("projects in new format", projectSetsInNewFormat);

module.exports = convertProjectSets;
