const { Schema, model } = require('mongoose');
const codeBlock = require('./CodeBlock')

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    toolType: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String
    },
    createdAt: { type: Date, default: Date.now },
    iterations: [codeBlock]
})

const Project = model('project', projectSchema)

module.exports = Project;
