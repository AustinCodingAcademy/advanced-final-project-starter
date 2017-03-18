import mongoose, { Schema } from 'mongoose';


const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  user_id: {
    type: mongoose.ObjectId,
    required: true
  },

  // Items do not have their own ItemModel.js file, but will instead exist
  // inside of a List document in the Lists collection.
  items: [{
    // Declare a new property items, and set its value to an array.
    // Mongoose will store an array of items.
    text: {
      type: String,
      required: true
    },

    completed: {
      type: Boolean,
      required: true
    }
  }]
});


export default mongoose.model('List', listSchema);
