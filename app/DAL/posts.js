const { ObjectId } = require("mongodb");
const MongoDatabase = require("./db");

class PostsCollection {
  constructor() {
    this.postsCollection = MongoDatabase.instance().db().collection("posts");
  }

  static instance() {
    if (!this._instance) {
      this._instance = new PostsCollection();
    }
    return this._instance;
  }

  static async findAll() {
    try {
      return await this.instance().postsCollection.find({}).toArray();
    } catch (error) {
      console.error("Error in findAll:", error);
      throw error;
    }
  }

  static async findById(idStr) {
    try {
      return await this.instance().postsCollection.findOne({
        _id: new ObjectId(idStr),
      });
    } catch (error) {
      console.error("Error in findById:" + error);
      throw error;
    }
  }

  static async create(post) {
    try {
      return await this.instance().postsCollection.insertOne(post);
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  static async update(idStr, post) {
    try {
      return await this.instance().postsCollection.updateOne(
        { _id: new ObjectId(idStr) },
        { $set: post }
      );
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  static async delete(idStr) {
    try {
      return await this.instance().postsCollection.deleteOne({
        _id: new ObjectId(idStr),
      });
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }
}

module.exports = PostsCollection;
