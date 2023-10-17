// Description: Converts projectSets to an array of arrays of objects

// Convert date format from MM-DD-YYYY to YYYY-MM-DD
function convertDateFormat(date) {
  const [month, day, year] = date.split("-");
  return `${year}-${month}-${day}`;
}

function convertProjectSets(projectSets) {
  const newFormat = [];

  projectSets.forEach(({ projects }) => {
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

module.exports = convertProjectSets;
