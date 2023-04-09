const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "project"
  }]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.methods.newProject= async function (payload, projectName, projectDescription) {
//   let initialCode = await newCode(payload)
//   this.projects.push({
//     projectName,
//     projectDescription,
//     initialCode: initialCode
//   })
// }

// userSchema.methods.editCode = async function (target, payload) {
//   return editCode(target, payload)
// }

const User = model('User', userSchema);

module.exports = User;
