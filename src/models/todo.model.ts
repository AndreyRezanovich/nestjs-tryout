const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
    // _id: mongoose.Types.ObjectId,
    text: String,
    checked: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  });

module.exports = mongoose.model('Todo', TodoSchema);
