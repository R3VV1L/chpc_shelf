const Router = require("express").Router;
const PostController = require("../controllers/post-controller.js");
const router = new Router();

router.get("/show/card/", PostController.showAll);
router.post("/add/card", PostController.add);

// Обработка ошибки 404
router.get('*', function(req, res){
  res.status(404).send('<title>404</title><h1>404</h1>');
});

module.exports = router;
