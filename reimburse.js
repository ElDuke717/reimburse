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

// Create a new Project and a new Set to hold projects

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
  // method adds project to a set
  addProject(project) {
    this.projects.push(project);
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

// Main function to ask all the questions and creates objects based on projects and projectSet arrays
const asker = async () => {
  // while loop runs until no sets are added
  while (true) {
    const setName = await askQuestion(
      rl,
      "Enter in a project set name.  A project set is a collection of related projects: "
    );
    const projectSet = new ProjectSet(setName);
    // runs while projects are being added
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

      const project = new Project(name, startDate, endDate, cityType);
      projectSet.addProject(project);

      const anotherProject = await askQuestion(
        rl,
        "Would you like to add another project? (y/n) "
      );
      if (anotherProject.toLowerCase() === "n") {
        break;
      }
    }
    // push project sets to an array to hold them
    projectSets.push(projectSet);

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
  console.log("Here are your project sets: ");
  projectSets.forEach((set) => {
    console.log(`Project Set: ${set.name}`);
    console.log(set.projects);
  });
};

// invoke asker function - later this will be used to create project objects and then sets
asker();

/* TO DO 
Calculate the number of travel days
Calculate the number of full days
Calculate the reimbursement amount for the travel days
Calculate the reimbursement amount for the full days
Add the reimbursement amounts together to get the total reimbursement amount
Return the total reimbursement amount
Display the total reimbursement amount to the user

*/
