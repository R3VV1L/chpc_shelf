require("dotenv").config();
const COMPANY = process.env.COMPANY;
const Post = require("../models/Post");

class PostServices {
  async add(title, description, type, genre) {
    try {
      let el = await Post.create({ title, description, type, genre });
      console.log(el)
    } catch (err) {
      console.log(`---------------\n${COMPANY}_ERR: ${err.errors[0].message}\n---------------`)
    }
  }
}

module.exports = new PostServices();
