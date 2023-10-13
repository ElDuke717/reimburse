// prompts to get data from command line - from Node.js readline documentation https://nodejs.org/api/readline.html

// use readline module to get input from user
const readline = require("readline");

// Create an interface for reading from stdin (keyboard) and writing to stdout (console)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define the list of questions to be asked
const questions = [
  "What is your name? ",
  "Enter in a project set name. A set is a collection of projects. ",
  "What is the start date of your project? (Please format the dates as mm-dd-yyyy) ",
  "What is the end date of your project? ",
  "What is the city type of your project? (low or high cost) ",
  "Would you like to add another project? (y/n) ",
];

// Function to ask a single question and return a Promise that resolves with the answer - this is a more robust apprach than just saving response synchronously https://nodejs.org/api/readline.html#promises-api
const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Main function to ask all the questions
const asker = async () => {
  // Initialize an empty array to store the answers
  let answers = [];
  // loop through the questions array
  for (let question of questions) {
    // async await the answer to each question
    const answer = await askQuestion(rl, question);
    // push the answer to an array - later will use this in a constructor to create an object.
    answers.push(answer);
    // ensure letters entered are lower case
    if (
      question === "Would you like to add another project? (y/n) " &&
      answer.toLowerCase() === "n"
    ) {
      // if no more sets are to be added, break out of program and return result
      break;
    }
  }

  console.log("Here are your answers: ", answers);
  rl.close();
};

// invoke asker function - later this will be used to create project objects and then sets
asker();

/* TO DO 
Make Class to construct a Set to contain projects
Make a Class to construct a project objects
Calculate the number of travel days
Calculate the number of full days
Calculate the reimbursement amount for the travel days
Calculate the reimbursement amount for the full days
Add the reimbursement amounts together to get the total reimbursement amount
Return the total reimbursement amount
Display the total reimbursement amount to the user

*/

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
  // test feature listProjects lists all the projects in a set
  listProjects() {
    return this.projects
      .map((project, index) => {
        // add 1 to make projects not zero indexed
        return `${index + 1}. ${project.name} (${
          project.cityType
        }) - from ${project.startDate.toDateString()} to ${project.endDate.toDateString()}`;
      })
      .join("\n");
  }
}
