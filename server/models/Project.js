const { Schema, model } = require('mongoose');
const codeBlock = require('./CodeBlock')
const {newCode, editCode} = require('../utils/aiFetch')

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
      ref: "codeBlock"
    }]
})

projectSchema.methods.newCode= async function (payload) {
  let firstCode = await newCode(payload)
  this.iterations.push(firstCode)
}


projectSchema.methods.editCode = async function (target, payload) {
    let iteration= await editCode(target, payload)
    this.iterations.push({
        iteration
    })
}

const Project = model('project', projectSchema)

module.exports = Project;
