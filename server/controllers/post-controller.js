const e = require("cors");
const PostServices = require("../services/post-services");

class PostController {
  async show(req, res) {
    try {
      // res.json(await PostController.show());
    } catch (err) {
      console.log(err);
    }
  }

  async add(req, res) {
    try {
      const { title, description, type, genre } = req.body;
      let post = PostServices.add(title, description, type, genre)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new PostController();
