const PostsCollection = require("../DAL/posts");

module.exports = {
  getAllPosts: async () => {
    const allPosts = await PostsCollection.findAll();
    return allPosts.map((p) => ({
      id: p._id,
      title: p.title,
      content: p.content,
      picture: p.picture,
      createdAt: p.createdAt,
    }));
  },
  getPost: async (strId) => {
    const post = await PostsCollection.findById(strId);
    const { _id, title, content, picture, createdAt } = post;
    return {
      _id,
      title,
      content,
      picture,
      createdAt,
    };
  },
  createPost: async (p) => {
    const u = await PostsCollection.create({
      ...p,
      createdAt: Date.now(),
    });
    return u;
  },
  updatePost: async (strId, p) => {
    const u = await PostsCollection.update(strId, p);
    return u;
  },

  deletePost: async (strId) => {
    const u = await PostsCollection.delete(strId);
    return u;
  },
};
