const { seedDatabase } = require("./dataSeeder");
const { deleteAllRecords } = require("./dataDelete");

async function questions() {
  const inquirer = await import("inquirer");

  const answers = await inquirer.default.prompt({
    name: "script",
    type: "list",
    message: "Виберіть скрипт для виконання:",
    choices: ["Заповнити базу даних", "Видалити всі записи"]
  });

  handleUserChoice(answers.script);
}

async function handleUserChoice(choice) {
  switch (choice) {
    case "Заповнити базу даних":
      await seedDatabase();
      break;

    case "Видалити всі записи":
      await deleteAllRecords();
      break;

    default:
      console.log("Невідомий вибір.");
  }
}

questions();
