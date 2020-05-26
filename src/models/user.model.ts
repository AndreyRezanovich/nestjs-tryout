// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('User', UserSchema);
