import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Check if the model exists in the models object
    const model = models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found.`);
    }

    // Ensure that db and the db.db object are available
    const database = db?.db;
    if (!database) {
      throw new Error('Database connection not available.');
    }

    // Check if the collection exists
    const modelExists = await database.listCollections({ name: collectionName }).toArray();
    if (modelExists.length) {
      await database.dropCollection(collectionName);
    }
  } catch (err) {
    console.error('Error dropping collection:', err);
    throw err;
  }
};