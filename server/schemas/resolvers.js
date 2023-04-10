const { AuthenticationError } = require('apollo-server-express');
const { User, Project, CodeBlock } = require('../models');
const { signToken } = require('../utils/auth');
const {newCode, editCode}= require('../utils/aiFetch')

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    me: async (parent, args, context) => {
      return User.findOne({_id: context.user._id}).populate("projects")
    },
    projects: async () => {
      return Project.find();
    },

    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
    
  },

  Mutation: {
    newProject: async(parent, {initialCode, projectName, projectDescription}, context) => {
      if (context.user) {

        // const newProjectUser = await User.findById(context.user._id);
        const firstFetch = await newCode(initialCode)
        const firstCodeBlock = await CodeBlock.create({block: `${firstFetch}`})
        const newProject = await Project.create({initialCode, projectName, projectDescription});
        // console.log(newProject._id)
        // newProject.iterations.push(firstCodeBlock)
        // await newProject.newCode(initialCode);
        await Project.findOneAndUpdate(
          {_id: newProject._id},
          {$addToSet: {iterations: firstCodeBlock}}
        )
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: {projects: newProject}}
        )
        // newProject.newProject(initialCode);
        // newProject.iterations.push(firstIteration)
        // newProjectUser.projects.push(newProject);
        // newProjectUser.save();

        return newProject
      }
      throw new AuthenticationError("You need to be logged in!");
      // const user = await User.findById({context})
      // // await 
      // await user.createCode(initialCode)
      // // return await newCode(code);
    },
    saveProject: async(parent, {currentCode, prompt, projectID}, context) => {
      if (context.user) {

        // const newProjectUser = await User.findById(context.user._id);
        const codeEdit = await editCode(currentCode, prompt)
        const nextBlock = await CodeBlock.create({block: `${codeEdit}`})
        const updatedProject = await Project.findOneAndUpdate(
          {_id: projectID},
          {$addToSet: {iterations: nextBlock}}
        )
        await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: {projects: updatedProject}}
        )

        return updatedProject
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
   
  
    // fetchAI: async (parent, {userID, initialCode}) => {
      
    // }


    // ***Add a third argument to the resolver to access data in our `context`(defined middleware in server.js) and lock down this route
    // addSkill: async (parent, { profileId, skill }, context) => {
    //   // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
    //   if (context.user) {
    //     return Profile.findOneAndUpdate(
    //       { _id: profileId },
    //       {
    //         $addToSet: { skills: skill },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //    // If user attempts to execute this mutation and isn't logged in, throw an error
    //    throw new AuthenticationError('You need to be logged in!');
    //   },
      // Set up mutation so a logged in user can only remove their profile and no one else's
    // removeProfile: async (parent, args, context) => {
    //   if (context.user) {
    //     return Profile.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // // Make it so a logged in user can only remove a skill from their own profile
    removeProjectfromUser: async (parent, { projectId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: projectId }},
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
};

module.exports = resolvers;
