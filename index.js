const Engineer = require("./classes/Engineer");
const Intern = require("./classes/Intern");
const Manager = require("./classes/Manager");

const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

//collect all team objects
const team = [];
const ManagerQuestions = [
  {
    type: "input",
    message: "What is the Manager's name",
    name: "name",
  },
  {
    type: "input",
    message: "What is the Manager's id",
    name: "id",
  },
  {
    type: "input",
    message: "What is the Manager's email",
    name: "email",
  },
  {
    type: "input",
    message: "What is the Manager's officeNumber",
    name: "officeNumber",
  },
];
const InternQuestions = [
  {
    type: "input",
    message: "What is the Intern's name",
    name: "name",
  },
  {
    type: "input",
    message: "What is the Intern's id",
    name: "id",
  },
  {
    type: "input",
    message: "What is the Intern's email",
    name: "email",
  },
  {
    type: "input",
    message: "What is the Intern's school",
    name: "school",
  },
];
const EngineerQuestions = [
  {
    type: "input",
    message: "What is the Engineer's name",
    name: "name",
  },
  {
    type: "input",
    message: "What is the Engineer's id",
    name: "id",
  },
  {
    type: "input",
    message: "What is the Engineer's email",
    name: "email",
  },
  {
    type: "input",
    message: "What is the Engineer's github",
    name: "github",
  },
];

const createManager = () => {
  //ask the questions_
  inquirer.prompt(ManagerQuestions).then((a) => {
    //based on the answers make class obj
    const objManager = new Manager(a.name, a.id, a.email, a.officeNumber);
    //push the obj to array of
    team.push(objManager);
    //ask the main questions again
    startQuestions();
  });
};

const createIntern = () => {
  //ask the questions_
  inquirer.prompt(InternQuestions).then((a) => {
    //based on the answers make class obj
    const objIntern = new Intern(a.name, a.id, a.email, a.school);
    //push the obj to array of
    team.push(objIntern);
    //ask the main questions again
    startQuestions();
  });
};

const createEngineer = () => {
  //ask the questions_
  inquirer.prompt(EngineerQuestions).then((a) => {
    //based on the answers make class obj
    const objEngineer = new Engineer(a.name, a.id, a.email, a.github);
    //push the obj to array of
    team.push(objEngineer);
    //ask the main questions again
    startQuestions();
  });
};

const startQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee would you like to add to your team",
        name: "choice",
        choices: ["Engineer", "Intern", "Manager", "No more pLease"],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        case "Manager":
          createManager();
          break;
        default:
          buildTeamHTML();
          break;
      }
    });
};

const buildTeamHTML = () => {
  fs.writeFileSync(
    path.join(__dirname, "/output/team.html"),
    convertTeamsArrayToHTML(team)
  );
};

const convertTeamsArrayToHTML = (team) => {
  const arrayTeamCards = team.map((m) => {
    switch (m.getRole()) {
      case "Manager":
        return `
        <div class="employee-card">
          <div class="manager-card">
              <p class="card-title"> Manager </p>
              <p>Name: ${m.getName()}</p>
              <p>Id: ${m.getId()}</p>
              <p>Email: ${m.getEmail()}</p>
              <p class="p-final">OfficeNumber: ${m.getOfficeNumber()}</p>
          </div>
        </div> 
        `;

      case "Intern":
        return `
          <div class="employee-card">
            <div class="intern-card">
            <p class="card-title"> Intern </p>
              <p>Name: ${m.getName()}</p>
              <p>Id: ${m.getId()}</p>
              <p>Email: ${m.getEmail()}</p>
              <p class="p-final">School: ${m.getSchool()}</p>
            </div>
          </div>
        `;
      case "Engineer":
        return `
          <div class="employee-card">
            <div class="engineer-card">
            <p class="card-title"> Engineer </p>
              <p>Name: ${m.getName()}</p>
              <p>Id: ${m.getId()}</p>
              <p>Email: ${m.getEmail()}</p>
              <p class="p-final">Github: ${m.getGithub()}</p>
          </div>
        </div>
        `;
      default:
        break;
    }
  });

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC">
        <link rel="stylesheet" href="../styles.css">
        <title>Document</title>
    </head>
    <body>
      <h1 class="header-title">Welcome to the Team!</h1>
      <br>
      <div class="team-cards row">
      ${arrayTeamCards.join("")}
    
      </div>
    </body>
    </html>`;
};

startQuestions();
