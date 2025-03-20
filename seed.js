import mongoose from "mongoose";
// Replace with your actual MongoDB connection string
const MONGO_URI = 'mongodb+srv://pavlosmacdonald:CYRwyXDkOxvkqoQI@cluster0.ieezo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const timeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const gnosisSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  body: { type: String, required: true },
  time_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Time', required: true },
});

const Time = mongoose.model('Time', timeSchema);
const Gnosis = mongoose.model('Gnosis', gnosisSchema);

const seedDatabase = async () => {
  try {
    await Time.deleteMany({});
    await Gnosis.deleteMany({});

    const timeEntry = await Time.create({ name: 'month' });
    
    const gnosisEntry = await Gnosis.create({
      title: 'One Month',
      subtitle: 'A Time for New Beginnings and Bold Action',
      time_id: timeEntry._id,
      body: `This is a month of fresh starts, self-leadership, and dynamic energy. The number 1 carries the vibration of independence, ambition, and new opportunities. Over the next few weeks, you are called to step forward with confidence, take initiative, and assert your personal power. Success this month depends on your ability to trust yourself, take decisive action, push beyond your comfort zone, and welcome new ideas and opportunities. Standing strong in your individuality will be key. The 1 Personal Month is ideal for launching new projects, setting fresh goals, and making bold moves in career, relationships, and personal growth. If there’s something you’ve been wanting to start—whether it's a business, a creative pursuit, or a new lifestyle habit—this is the time to go for it. The energy of this month supports pioneering efforts and rewards those who take the lead. However, while ambition is high, it’s important to balance assertiveness with patience. Others may not share your urgency or vision, so lead by example rather than forcing your way forward. Stay focused on your own path, and don’t let external opinions shake your confidence. Be proactive, but avoid unnecessary conflict. This month is also a time to set the tone for the months ahead. The decisions you make now will shape your trajectory, so act with clarity and purpose. Pay attention to new connections that come into your life—these could be significant in the long run. But as exciting as new relationships, personal or professional, may seem, keep a level head and maintain your independence. Finally, use this time wisely. The energy of the 1 month is potent but fleeting. If you hesitate too much or let distractions pull you off course, you may miss valuable opportunities. Stay focused, stay fearless, and step forward with confidence.This is your moment to plant the seeds of your future. Own it.`
    });

    console.log('Seeding complete:', { timeEntry, gnosisEntry });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();