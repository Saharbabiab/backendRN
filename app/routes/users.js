const controller = require("../controllers/users");
const router = require("express").Router();

router.get("/", controller.listUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.createUser);
router.post("/login", controller.getLoginUser);
router.post("/exists", controller.existsUser);
router.post("/addpost", controller.addpost);
router.post("/addbuy", controller.addbuy);

module.exports = router;
