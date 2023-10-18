# Reimburse: Expense Reimbursement Application

### Overview

Reimburse is a simple application designed to help users calculate the amount they should be reimbursed for their business trips. It is a command line application and adheres to specific rules that consider various types of days (travel days, full days, etc.) and cities (low cost, high cost).

### Features

- User-friendly CLI travel data input.
- Use the command line with Node.js.
- Dynamic calculation of reimbursement based on user input.

### Requirements

- Node.js (for CLI)
- An environment for running Node.js applications

## Installation

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/ElDuke717/reimburse
   ```

2. Navigate to the base directory.

   ```bash
   cd reimbursement-app
   ```

### Usage

While in the base directory, run the application with Node.js.

```bash
node main.js
```

## Development

The application is written in JavaScript and uses Node.js for the command line interface (CLI).

A web application using based on this program will be built in the future.

To contribute to the project:

1. Fork the repository.
2. Clone your fork.
3. Make your changes.
4. Create a pull request.

## Application Structure

```bash
.
├── README.md
├── changeRates.js
├── convertProjects.js
├── generateProjectSetDays.js
├── img
│   ├── cli-test.png
│   └── hand-calc-totals.png
├── main.js
├── package.json
├── plan.md
└── reimbursementCalculator.js
```

The application is broken into several modules to make the code easier to read and maintain:

- `main.js` is the entry point for the application. It contains the CLI logic, entry validation, and Classes for constructing projects and sets. The prompts are handled by `asker`, which is an ansynchronous function that returns a promise.
- `convertProjects.js` contains the logic for converting the user input from an object for each set to an array for each set and objects containing the project data `cityType`, `startDate` and `endDate`.
- `generateProjectSetDays.js` adds days between start and end dates to each project object.
- `changedRates.js` contains the logic for calculating the reimbursement rates for each day based on whether it is a full day or a travel day.
- `reimbursementCalculator.js` contains the logic for calculating the total reimbursement for each project, then logging the totals to the console.

## License

MIT

## Author

Nick Huemmer
