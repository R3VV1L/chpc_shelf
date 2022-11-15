const Router = require("express").Router;
const PostController = require('../controllers/post-controller.js')
const router = new Router();

router.get("/show", PostController.show);
router.post("/add-card", PostController.add);

module.exports = router;