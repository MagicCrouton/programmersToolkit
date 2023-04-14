const { Schema, model } = require('mongoose');
const CodeBlock = require('./CodeBlock')

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    initialCode: {
        type: String,
        required: true,
      },
    // toolType: {
    //     type: String,
    //     required: true,
    // },
    projectDescription: {
        type: String
    },
    createdAt: { type: Date, default: Date.now },
    iterations: [{
      type: Schema.Types.ObjectId,
      ref: "CodeBlock"
    }]
})


const Project = model('Project', projectSchema)

module.exports = Project;
