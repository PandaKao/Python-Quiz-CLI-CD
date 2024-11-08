import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

// Dynamically import the JSON file using the correct syntax
const questionData = await import('./pythonQuestions.json', {
  assert: { type: 'json' },
});

async function seedDatabase() {
  try {
    await db();
    cleanDB();

    // Insert the data into the database
    await Question.insertMany(questionData.default);  // Access the default export

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();