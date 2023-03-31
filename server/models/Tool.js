const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const toolSchema = new Schema({
  name: [
    {
      type: String,
    },
  ],
 
// savedTool from CHAT GPT search
  toolId: {
    type: String,
    required: true,
  },
  
  
  
});

module.exports = toolSchema;