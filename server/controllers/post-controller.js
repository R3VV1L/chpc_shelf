const PostServices = require("../services/post-services");

class PostController {
  // Просмотр всех постов
  async showAll(req, res) {
    try {
      let allPost = PostServices.showAll();
      return res.json(await allPost)
    } catch (err) {
      console.log(err);
    }
  }

  // Добавление постов
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
