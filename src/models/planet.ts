import mongoose from 'mongoose';

const PlanetSchema = new mongoose.Schema({
  planet: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default mongoose.models.Planet || mongoose.model('Planet', PlanetSchema);
