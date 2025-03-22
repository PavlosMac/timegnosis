import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs"
import { dirname } from 'path';
// Replace with your actual MongoDB connection string
const MONGO_URI = 'mongodb+srv://pavlosmacdonald:CYRwyXDkOxvkqoQI@cluster0.ieezo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const timeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const importJsonFile = (filePath) => {
  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse the JSON content
  const jsonData = JSON.parse(fileContent);

  return jsonData;
}

const gnosisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  body: { type: String, required: true },
  energy: { type: mongoose.Schema.Types.Int32, ref: 'energy', required: true },
  mode: { type: mongoose.Schema.Types.String, ref: 'mode', required: true },
});

const Time = mongoose.model('Time', timeSchema);
const Gnosis = mongoose.model('Gnosis', gnosisSchema);

const seedDatabase = async () => {
  try {
    await Time.deleteMany({});
    await Gnosis.deleteMany({});

    const dir = dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(dir, 'gnosis-seed.json'); // Replace 'data.json' with your JSON file name
    const gnosisEntries = importJsonFile(filePath);

    const result = await Gnosis.insertMany(gnosisEntries);

    console.log('Seeding complete:', result);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();