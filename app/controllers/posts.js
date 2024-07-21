const { MongoClient } = require("mongodb");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../services/posts");

module.exports = {
  listPosts: async (req, res) => {
    try {
      const posts = await getAllPosts();
      res.json(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await getPost(id);
      res.json(post);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const post = req.body;
      const newPost = await createPost(post);
      res.json(newPost);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = req.body;
      const updatedPost = await updatePost(id, post);
      res.json(updatedPost);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedPost = await deletePost(id);
      res.json(deletedPost);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
