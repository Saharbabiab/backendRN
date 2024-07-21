const { ObjectId } = require("mongodb");
const MongoDatabase = require("./db");

class UsersCollection {
  constructor() {
    this.usersCollection = MongoDatabase.instance().db().collection("users");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new UsersCollection();
    }
    return this._instance;
  }

  static async findAll() {
    try {
      return await this.instance().usersCollection.find({}).toArray();
    } catch (error) {
      console.error("Error in findAll:", error);
      throw error;
    }
  }
  static async findByMail(mail) {
    try {
      console.log(mail);
      const u = await this.instance().usersCollection.findOne({ mail: mail });
      if (u) return u;
      return null;
    } catch (error) {
      console.error("Error in findByMail:", error);
      throw error;
    }
  }

  static async findById(idStr) {
    console.log("idStr:", idStr);
    try {
      return await this.instance().usersCollection.findOne({
        _id: new ObjectId(idStr),
      });
    } catch (error) {
      console.error("Error in findById:" + error);
      throw error;
    }
  }

  static async create(user) {
    try {
      const newUser = {
        ...user,
        posts: [],
        buys: [],
      };
      return await this.instance().usersCollection.insertOne(newUser);
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  static async addPost(userId, post) {
    try {
      const user = await this.instance().usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      const posts = user.posts;
      posts.push(post);
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            posts: posts,
          },
        }
      );
    } catch (error) {
      console.error("Error in addPost:", error);
      throw error;
    }
  }

  static async addBuy(userId, buy) {
    try {
      const user = await this.instance().usersCollection.findOne({
        _id: new ObjectId(userId),
      });
      const buys = user.buys;
      buys.push(buy);
      return await this.instance().usersCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            buys: buys,
          },
        }
      );
    } catch (error) {
      console.error("Error in addBuy:", error);
      throw error;
    }
  }

  static async findByName(name) {
    try {
      return await this.instance().usersCollection.findOne({
        name: name,
      });
    } catch (error) {
      console.error("Error in findByName:", error);
      throw error;
    }
  }
}

module.exports = UsersCollection;
