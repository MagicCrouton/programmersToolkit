const { Schema, model } = require('mongoose');


const codeBlockSchema = new Schema({
  instructions: 
    {
      type: String,
    },
  block: 
    {
      type: String,
    },
  createdAt: { type: Date, default: Date.now },
});

const CodeBlock = model('CodeBlock', codeBlockSchema)
module.exports = CodeBlock