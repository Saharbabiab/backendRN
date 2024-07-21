const { MongoClient } = require("mongodb");
const {
  getAllUsers,
  getUser,
  createUser,
  findByName,
  findByMail,
  addpost,
  addbuy,
} = require("../services/users");

module.exports = {
  listUsers: async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await getUser(id);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  existsUser: async (req, res) => {
    try {
      const { mail } = req.body;
      const user = await findByMail(mail);
      if (user) {
        res.json(true);
      } else {
        // res.status(400).send("Wrong password");
        return res.json(false);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getLoginUser: async (req, res) => {
    try {
      const { mail, password } = req.body;
      const user = await findByMail(mail);
      if (user && user.password === password) {
        res.json(user);
      } else {
        return res.json(null);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const p = req.body;
      const newUser = await createUser(p);
      res.json(newUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addpost: async (req, res) => {
    try {
      const { userId, postId } = req.body;
      const user = await addpost(userId, postId);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addbuy: async (req, res) => {
    try {
      const { userId, buyId } = req.body;
      const user = await addbuy(userId, buyId);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  findByName: async (req, res) => {
    try {
      const name = req.params.name;
      const user = await findByName(name);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
