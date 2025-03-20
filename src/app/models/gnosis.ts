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
    required: true}
});

export default mongoose.models.Gnosis || mongoose.model('Gnosis', GnosisSchema);