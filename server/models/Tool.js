const { Schema } = require('mongoose');


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