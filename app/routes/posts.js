const controller = require("../controllers/posts");
const router = require("express").Router();

router.get("/", controller.listPosts);
router.get("/:id", controller.getPost);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
