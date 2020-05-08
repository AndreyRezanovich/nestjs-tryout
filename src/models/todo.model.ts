const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
        // _id: mongoose.Schema.Types.ObjectId,
        text: String,
        checked: {
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false
    });

module.exports = mongoose.model('Todo', TodoSchema);

