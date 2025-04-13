import fs from 'fs';
import path from 'path';
import sequelize from '../../config/database.js';
import { Model, ModelStatic, Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';

const filename = fileURLToPath(import.meta.url) || path.resolve();
const __dirname = path.dirname(filename);
const basename = path.basename(filename);

interface ExtendedModel extends ModelStatic<Model> {
  associate?: (models: DbModels) => void;
}

interface DbModels {
  [key: string]: ExtendedModel;
}

const db: { sequelize?: Sequelize; Sequelize?: typeof Sequelize, models: {[key: string]: ExtendedModel} } = {
  models: {}
};

  
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
      if (file !== basename && (file.endsWith('.model.ts') || file.endsWith('.model.js'))) {
        const filePath = path.join(__dirname, file);
        const fileUrl = pathToFileURL(filePath).href;
        const modelModule = await import(fileUrl);
        if (modelModule.default && typeof modelModule.default.initModel === 'function') {
          const model = modelModule.default as { name: string; initModel: (sequelize: Sequelize) => ExtendedModel };
          // db[model.name] = model.initModel(sequelize);
          db.models[model.name] = model.initModel(sequelize);
        }
      }
  }

  // Setup associations after all models are loaded
  Object.keys(db.models).forEach((modelName) => {
    if (db.models[modelName]?.associate) {
      db.models[modelName].associate(db.models);
    }
  });

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;


// Run model loading asynchronously

export {sequelize, db}
