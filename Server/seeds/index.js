const db = require('../config/connection');
const { User, Snippet } = require('../models');
const userData = require('./userData.json');
const snippetData = require('./snippetData.json');

db.once('open', async () => {
  try {
    await Snippet.deleteMany({});
    await User.deleteMany({});

    // Create all users
    const users = await User.create(userData);

    // Associate snippets with users
    for (const snippet of snippetData) {
      // Find the user with the matching username for the snippet
      const user = users.find((u) => u.username === snippet.username);

      // Create the snippet and associate it with the user
      const createdSnippet = await Snippet.create(snippet);
      user.snippets.push(createdSnippet._id); // Add the snippet's _id to the user's snippets array
      await user.save(); // Save the updated user
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
