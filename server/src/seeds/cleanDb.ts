import Question from "../models/Question.js";

const cleanDB = async (): Promise<void> => {
  try {
    await Question.deleteMany({});
    console.log('Question collection cleaned.');

  } catch (err) {
    console.error('Error cleaning', err);
    process.exit(1);
  }
};

export default cleanDB;
