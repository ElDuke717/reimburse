/* TO DO
Calculate the number of travel days
Calculate the number of full days
Calculate the reimbursement amount for the travel days
Calculate the reimbursement amount for the full days
Add the reimbursement amounts together to get the total reimbursement amount
Return the total reimbursement amount
*/

// helper function to convert the date input so that it can be used in the reimbursementCalculator function
function convertDate(date) {
  const [month, day, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
}

// calculate the reimbursement amount for a specific project set
function calculateReimbursement(projectSet) {
  let days = {};
  let totalReimbursement = 0;

  // Sort projectSet  projects by start date
  projectSet.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  // iterate over the dates, and convert them so they can be handled by the data object.
  projectSet.forEach((project) => {
    let startDate = convertDate(project.startDate);
    let endDate = convertDate(project.endDate);
    // deep copy of startDate since the Date object is mutable
    let currentDay = new Date(startDate.getTime());

    for (
      ;
      // compare just the date parts so that the time doesn't affect the comparison
      currentDay.toDateString() !== endDate.toDateString();
      currentDay.setDate(currentDay.getDate() + 1)
    ) {
      // format the date to match the format of the keys in the days object
      let dayStr = currentDay.toISOString().split("T")[0];

      if (days[dayStr]) {
        days[dayStr].type = "full";
      } else {
        days[dayStr] = {
          type: "travel",
          city: project.cityType, // Changed to cityType to match your Project class
        };
      }
    }
    currentDay.setDate(currentDay.getDate() - 1); // Reset to original value if you intend to reuse currentDay
  });

  let sortedDays = Object.keys(days)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => days[date]);

  sortedDays.forEach((day) => {
    totalReimbursement +=
      day.city === "h"
        ? day.type === "travel"
          ? 55
          : 85
        : day.type === "travel"
        ? 45
        : 75;
  });

  return totalReimbursement;
}

// Test the function with mm-dd-yyyy format
const projectSet1 = [
  { cityType: "l", startDate: "09-01-2015", endDate: "09-03-2015" },
];

const projectSet2 = [
  { cityType: "l", startDate: "09-01-2015", endDate: "09-01-2015" },
  { cityType: "h", startDate: "09-02-2015", endDate: "09-06-2015" },
  { cityType: "l", startDate: "09-06-2015", endDate: "09-08-2015" },
];

console.log(
  "Total reimbursement for project set 1:",
  calculateReimbursement(projectSet1)
);
console.log(
  "Total reimbursement for project set 2:",
  calculateReimbursement(projectSet2)
);

// module.exports = calculateReimbursement;
