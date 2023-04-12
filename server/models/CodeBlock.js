const { Schema, model } = require('mongoose');


const codeBlockSchema = new Schema({
  block: 
    {
      type: String,
    },
  createdAt: { type: Date, default: Date.now },
});

const CodeBlock = model('CodeBlock', codeBlockSchema)
module.exports = CodeBlock