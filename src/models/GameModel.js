import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  'owner' : {
    required: true,
    type: String
  },
  'name' : {
    required: true,
    type: String
  }
  'game' : {
    required: true,
    type: Array
  }
});

export default mongoose.model('movie-game', gameSchema);
