const { Schema } = require('mongoose');


const codeBlock = new Schema({
  iteration: [
    {
      type: String,
    },
  ]
});

module.exports = codeBlock;