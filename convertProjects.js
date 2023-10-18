// Description: Converts projectSets to an array of arrays of objects

// Helper function to convert date format from MM-DD-YYYY to YYYY-MM-DD
function convertDateFormat(date) {
  const [month, day, year] = date.split("-");
  return `${year}-${month}-${day}`;
}

// Takes in an array of objects and returns an array of arrays, each containing a project object.  
function convertProjectSets(projectSets) {
  const newFormat = [];
  // iterate over the project set objects and make them an array using an array constructor
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
