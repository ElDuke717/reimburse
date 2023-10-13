// prompts to get data
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "What is your name? ",
  "Enter in a project set name. A set is a collection of projects. ",
  "What is the start date of your project? (Please format the dates as mm-dd-yyyy) ",
  "What is the end date of your project? ",
  "What is the city type of your project? (low or high cost) ",
  "Would you like to add another project? (y/n) ",
];

const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const main = async () => {
  let answers = [];
  for (let question of questions) {
    const answer = await askQuestion(rl, question);
    answers.push(answer);
    if (
      question === "Would you like to add another project? (y/n) " &&
      answer.toLowerCase() === "n"
    ) {
      break;
    }
  }

  console.log("Here are your answers: ", answers);
  rl.close();
};

main();
