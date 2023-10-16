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

function calculateReimbursement(projectSet) {
    let days = {};
    let totalReimbursement = 0;
  
    // Sort projects by start date
    projectSet.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
    // Iterate over the projects
    projectSet.forEach((project) => {
      let startDate = convertDate(project.startDate);
      let endDate = convertDate(project.endDate);
      let currentDay = new Date(startDate.getTime());
  
      // Iterate over each day in the project
      for (
        ;
        currentDay.toDateString() !== endDate.toDateString();
        currentDay.setDate(currentDay.getDate() + 1)
      ) {
        let currentDayStr = currentDay.toISOString().split("T")[0];
        if (days[currentDayStr]) {
          days[currentDayStr].type = "full";
        } else {
          days[currentDayStr] = {
            type: "travel",
            city: project.cityType,
          };
        }
      }
  
      // Include the last day (endDate)
      let lastDayStr = endDate.toISOString().split("T")[0];
      if (days[lastDayStr]) {
        days[lastDayStr].type = "full";
      } else {
        days[lastDayStr] = {
          type: "travel",
          city: project.cityType,
        };
      }
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
  { cityType: "l", startDate: "09-01-2015", endDate: "09-03-2015" }, // 45 + 75 + 45 = 165
];

const projectSet2 = [
  { cityType: "l", startDate: "09-01-2015", endDate: "09-01-2015" }, // 45
  { cityType: "h", startDate: "09-02-2015", endDate: "09-06-2015" }, // 85 + 85 + 85 + 85 - double check the rules
  { cityType: "l", startDate: "09-06-2015", endDate: "09-08-2015" }, // 75 + 45  // 505 total?
];

const projectSet3 = [
  { cityType: "l", startDate: "09-01-2015", endDate: "09-01-2015" }, // 45
  { cityType: "h", startDate: "09-02-2015", endDate: "09-06-2015" }, // 85 + 85 + 85 + 55
];

console.log(
  "Total reimbursement for project set 1:",
  calculateReimbursement(projectSet1)
);
console.log(
  "Total reimbursement for project set 2:",
  calculateReimbursement(projectSet2)
);
console.log(
  "Total reimbursement for project set 3:",
  calculateReimbursement(projectSet3)
);

// module.exports = calculateReimbursement;
