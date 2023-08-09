const { AuthenticationError } = require("apollo-server-express");
const { User, Snippet } = require("../Models");
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    users: async () => {
      const userData = await User.find({})
        .select("-__v -password")
        .populate("snippets");
      return userData;
    },
    user: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await User.findOne(params)
        .select("-__v -password")
        .populate("snippets");
    },
    snippets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Snippet.find(params).sort({ createdAt: -1 });
    },
    snippet: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return await Snippet.findOne(params);
    },
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("Authentication required.");
      }

      try {
        // Fetch all snippets from the database that belong to the authenticated user
        const snippets = await Snippet.find({ user: context.user._id });

        // Return an object with the snippets data
        return {
          snippets,
        };
      } catch (error) {
        // Handle any potential errors
        throw new Error("An error occurred while fetching snippets.");
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      // Ensure that all required fields are provided in the arguments
      const { username, email, password } = args;
      if (!username || !email || !password) {
        throw new Error("Username, email, and password are required.");
      }

      try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User with this email already exists.");
        }

        // Create the new user
        const newUser = await User.create(args);
        return newUser;
      } catch (error) {
        throw new Error("Could not create user. Please try again.");
      }
    },
    login: async (parent, { email, password }) => {
      // Check if a user with the provided email exists in the database
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Invalid email');
      }
      // Check if the provided password matches the user's password

      const validPassword = await user.comparePassword(password);
      if (!validPassword) {
        throw new AuthenticationError('Invalid password');
      }

      // If the email and password are valid, sign a JWT token and return it along with the user data
      const token = signToken(user);
      return { token, user };
    },
    addSnippet: async (parent, args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError("Authentication required.");
      }

      try {
        // Associate the snippet with the authenticated user using the user's ID
        args.user = context.user._id;
        // Create the new snippet
        const newSnippet = await Snippet.create(args);
        return newSnippet;
      } catch (error) {
        throw new Error("Could not create snippet. Please try again.");
      }
    },
    updateSnippet: async (parent, args) => {
      // If you have an updateSnippet resolver, you can remove the authentication from it too.
      // Update the snippet using args and return the updated snippet.
      const updatedSnippet = await Snippet.findByIdAndUpdate(args._id, args, { new: true });
      return updatedSnippet;
    },
    removeSnippet: async (parent, { _id }) => {
      // Removed authentication, as it is not required anymore.
      // Remove the snippet without any user association.
      const deletedSnippet = await Snippet.findByIdAndDelete(_id);
      return deletedSnippet ? { _id: deletedSnippet._id } : null;
    },
    
  },
};

module.exports = resolvers;