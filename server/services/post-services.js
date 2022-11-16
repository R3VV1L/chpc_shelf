require("dotenv").config();
const COMPANY = process.env.COMPANY;
const Post = require("../models/Post");

class PostServices {
  async showAll() {
    try {
      return await Post.findAll();
    } catch (err) {
      console.log(
        `---------------\n${COMPANY}_ERR: ${err.errors[0].message}\n---------------`
      );
    }
  }

  async add(title, description, type, genre) {
    try {
      await Post.create({ title, description, type, genre });
    } catch (err) {
      console.log(
        `---------------\n${COMPANY}_ERR: ${err.errors[0].message}\n---------------`
      );
    }
  }
}

module.exports = new PostServices();
