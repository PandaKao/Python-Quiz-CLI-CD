import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Set models[modelName] to `any` to bypass the type checking
    const model = models[modelName] as any;

    if (!model || !model.db) {
      throw new Error(`Model or database not found for modelName: ${modelName}`);
    }

    const modelExists = await model.db.db.listCollections({
      name: collectionName
    }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};