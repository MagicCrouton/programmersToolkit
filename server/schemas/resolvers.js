const { AuthenticationError } = require('apollo-server-express');
const { User, Project, CodeBlock } = require('../models');
const { signToken } = require('../utils/auth');
const {newCode, editCode}= require('../utils/aiFetch')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("projects")
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("projects")
    },
    me: async (parent, args, context) => {
      return User.findOne({_id: context.user._id}).populate("projects")
    },
    projects: async () => {
      console.log(context.project._id)
      return Project.find().populate("iterations");
    },
    project: async (parent, { projectId }) => {
      // console.log(projectId)
      return Project.findOne({_id: projectId}).populate("iterations");
    },
    
  },

  Mutation: {
    findSingleProject: async (parent, { projectId }) => {

      return Project.findOne({_id: projectId}).populate("iterations");
    },    
    newProject: async(parent, {initialCode, projectName, projectDescription}, context) => {
      if (context.user) {

        const firstFetch = await newCode(initialCode)
        const firstCodeBlock = await CodeBlock.create({
          block: `${firstFetch}`,
          instructions: `${initialCode}`
        })
        const newProject = await Project.create({initialCode, projectName, projectDescription});

        await Project.findOneAndUpdate(
          {_id: newProject._id},
          {$addToSet: {iterations: firstCodeBlock}}
        )
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: {projects: newProject}}
        )

        return newProject
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editProject: async(parent, {currentCode, projectID, prompt}, context) => {
      if (context.user) {
        // const newProjectUser = await User.findById(context.user._id);
        let iteration = await editCode(`${currentCode}`, prompt)
        let nextBlock = await CodeBlock.create({
          block: `${iteration}`,
          instructions:`${prompt}`  
        })
        await Project.findOneAndUpdate(
          {_id: projectID},
          {$addToSet: {iterations: nextBlock}}
        )

      const updatedProject = await Project.findById(projectID).populate('iterations')
    return updatedProject
  }
      throw new AuthenticationError("You need to be logged in!");
    },
    saveProject: async(parent, {currentCode, blockId}, context) => {
      if (context.user) {

        let update = await CodeBlock.findOneAndUpdate(
          {_id: blockId},
          {block: currentCode}
        )

        return update
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
   
  
    removeProjectfromUser: async (parent, { projectId }, context) => {
      if (context.user) {
        // Remove the project document from the Project collection
        await Project.findByIdAndRemove(projectId);
        
        // Remove the project ID from the user's projects array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: projectId }},
          { new: true }
        ).populate("projects");
    
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
  },
};

module.exports = resolvers;
