// This file is the entry point for the application

// require generateProjectSetDays to convert the projectSet into an object with days
const generateProjectSetDays = require("./generateProjectSetDays");
// require convertProjects to convert the projectSet into an object with days
const convertProjects = require("./convertProjects");
// require changeRates to change the rates for each day based on if there is a gap or not between dates
const changeRates = require("./changeRates");
// require reimbursementCalculator to calculate the total rates for each project set and the grand total
const reimbursementCalculator = require("./reimbursementCalculator");

// prompts to get data from command line - from Node.js readline documentation https://nodejs.org/api/readline.html
// use readline module to get input from user
const readline = require("readline");

// Create an interface for reading from stdin (keyboard) and writing to stdout (console)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// askQuestion is a helper function to ask a single question and return a Promise that resolves with the answer - this is a more robust apprach than just saving response synchronously https://nodejs.org/api/readline.html#promises-api
const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Create a Projects and a Sets to hold projects with Classes

// class Project to make a new Project
class Project {
  constructor(name, startDate, endDate, cityType) {
    this.name = name;
    this.startDate = startDate;
    this.end = endDate;
    this.cityType = cityType;
  }
}
// class to Create new sets to hold projects
class ProjectSet {
  constructor(setName) {
    this.name = setName;
    this.projects = [];
  }
}

// Array to hold Project Sets
const projectSets = [];

// Helper functions to validate if inputs are in the correct format:
const isValidDate = (date) => {
  // this regex verifies if the date is in the correct format: mm-dd-yyyy
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(date);
};

// Helper function to validate if city types are in the correct format:
const isValidCityType = (type) => {
  return type === "l" || type === "h";
};

// initialize rates to hold value of changedRates, returned by main
let rates;

// initialize setNames, an array to hold the names of the sets, used in the output
const setNames = [];

// Main function to ask all the questions and creates objects based on projects and projectSet arrays
// returns a promise that resolves with the projectSets array, an array of objects, each containing a set name and an array of projects
// Data is collected in this way to preserve the set name and also allow for data to be manipulated in other ways if needed.
const asker = async () => {
  while (true) {
    const setName = await askQuestion(
      rl,
      "Enter in a set name. A set is a collection of related projects: "
    );
    const projectSet = []; // Using an array for each project set
    // push the setName to the setNames array, used for outputting the total rates for each set
    setNames.push(setName);

    while (true) {
      const name = await askQuestion(rl, "What is the name of your project? ");
      // define variable, end loop if entry is valid, otherwise request valid entry.
      let startDate;
      while (true) {
        startDate = await askQuestion(
          rl,
          "What is the start date of your project? Please use the following format: mm-dd-yyyy "
        );
        if (isValidDate(startDate)) {
          break;
        } else {
          console.log("Invalid date format. Please enter again.");
        }
      }

      let endDate;
      while (true) {
        endDate = await askQuestion(
          rl,
          "What is the end date of your project? Please use the following format: mm-dd-yyyy "
        );
        if (isValidDate(endDate)) {
          break;
        } else {
          console.log("Invalid date format. Please enter again.");
        }
      }

      let cityType;
      while (true) {
        cityType = await askQuestion(
          rl,
          "What is the city type of your project? (l=low or h=high cost) "
        );
        if (isValidCityType(cityType)) {
          break;
        } else {
          console.log("Invalid city type. Please try again.");
        }
      }
      //
      const project = {
        name,
        startDate,
        endDate,
        cityType: cityType === "l" ? "low" : "high",
      };
      projectSet.push(project);

      const anotherProject = await askQuestion(
        rl,
        "Would you like to add another project? (y/n) "
      );
      if (anotherProject.toLowerCase() === "n") {
        break;
      }
    }
    // push project sets to an array to hold them
    projectSets.push({ setName, projects: projectSet });

    const anotherSet = await askQuestion(
      rl,
      "Would you like to add another project set? (y/n) "
    );
    if (anotherSet.toLowerCase() === "n") {
      break;
    }
  }
  // stop running the readline interface - listen for this to execute any code.
  rl.close();

  // asker returns the projectSets array - an array of objects, each object is a set with a name and an array of projects
  return projectSets;
};

// Main function to run the program - asynchronous, it issues a promise while questions are asked
const main = async () => {
  // asker is async to await the response from the user
  const projectSetsFromAsker = await asker();
  // convertProjects converts the projectSets array into an array of arrays of objects
  const convertedProjectSets = convertProjects(projectSetsFromAsker);
  // console.log("Project Sets:", convertedProjectSets);
  // projectSetDays is an array of arrays of objects with dates as keys and objects as values between the start and end dates of each project
  const projectSetDays = convertedProjectSets.map((set) =>
    generateProjectSetDays(set)
  );

  // changedRates is an array from passing changeRates to change the rates for each day based on if there is a gap or not between dates
  const changedRates = projectSetDays.map((set) => changeRates(set));
  // console.log(changedRates);
  // assign rates the value of changedRates
  rates = changedRates;
  // pass the rates and setNames to reimbursementCalculator to calculate the total rates for each project set and the grand total.  The results are logged by reimbursementCalculator.
  return reimbursementCalculator(rates, setNames);
};

// run the main function
main();
