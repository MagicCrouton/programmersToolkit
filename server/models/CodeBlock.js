const { Schema } = require('mongoose');


const codeBlock = new Schema({
  iteration: [
    {
      type: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = codeBlock;