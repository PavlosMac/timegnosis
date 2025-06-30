import mongoose from 'mongoose';

const GnosisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  energy: {
    type: Number, 
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: ['day','month','year'],
    lowercase: true
  }
});

// Compound index to accelerate queries filtered by mode & energy
GnosisSchema.index({ mode: 1, energy: 1 });

export default mongoose.models.Gnosis || mongoose.model('Gnosis', GnosisSchema);