const UsersCollection = require("../DAL/users.js");
const { post } = require("../index.js");

module.exports = {
  getAllUsers: async () => {
    const allUsers = await UsersCollection.findAll();
    return allUsers.map((u) => ({
      id: u._id,
      name: u.name,
      mail: u.mail,
      age: u.age,
      password: u.password,
      posts: u.posts,
      buys: u.buys,
    }));
  },

  getUser: async (strId) => {
    const user = await UsersCollection.findById(strId);
    const { _id, name, mail, age, password, posts, buys } = user;
    return {
      _id,
      name,
      mail,
      age,
      password,
      posts,
      buys,
    };
  },
  createUser: async (p) => {
    const u = await UsersCollection.create({
      ...p,
      posts: [],
      buys: [],
      createdAt: Date.now(),
    });
    return u;
  },
  addpost: async (userId, postId) => {
    const u = await UsersCollection.addPost(userId, postId);
    return u;
  },
  addbuy: async (userId, buyId) => {
    const u = await UsersCollection.addBuy(userId, buyId);
    return u;
  },
  findByMail: async (mail) => {
    return await UsersCollection.findByMail(mail);
  },
  findByName: async (name) => {
    const user = await UsersCollection.findByName(name);
    const { mail, age, password, posts, buys } = user;
    return {
      name,
      mail,
      age,
      password,
      posts,
      buys,
    };
  },
};
