const Engineer = require("./classes/Engineer");
const Intern = require("./classes/Intern");
const Manager = require("./classes/Manager");

const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

//collect all team objs
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
    message: "What is the Manager's officNumber",
    name: "officNumber",
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
    //based o nthe answers make class obj
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
    //based o nthe answers make class obj
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
    //based o nthe answers make class obj
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
            buildTeamHTML()
          break;
      }
    });
};

const buildTeamHTML = () => {
    fs.writeFileSync(path.join(__dirname, '/output/team.html'),convertTeamsArrayToHTML(team));
}

const convertTeamsArrayToHTML = (team) => {
    const arrayTeamCards = team.map((m) => {
        switch (m.getRole()) {
            case "Manager":
                return `
                    <div>
                        <p>Name: ${m.getName()}</p>
                        <p>Id: ${m.getId()}</p>
                        <p>Email: ${m.getEmail()}</p>
                        <p>OfficeNumber: ${m.getOfficeNumber()}</p>
                    </div>
                `;
                case "Intern":
                    return `
                        <div>
                            <p>Name: ${m.getName()}</p>
                            <p>Id: ${m.getId()}</p>
                            <p>Email: ${m.getEmail()}</p>
                            <p>School: ${m.getSchool()}</p>
                        </div>
                    `;
                    case "Engineer":
                        return `
                            <div>
                                <p>Name: ${m.getName()}</p>
                                <p>Id: ${m.getId()}</p>
                                <p>Email: ${m.getEmail()}</p>
                                <p>Github: ${m.getGithub()}</p>
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
        <title>Document</title>
    </head>
    <body>
        ${arrayTeamCards.join("")}
    </body>
    </html>`;
};



startQuestions();