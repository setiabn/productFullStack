const { Router } = require("express");
const userHandler = require("../handlers/user");

const router = Router();

router.post("/", userHandler.create);
router.get("/", userHandler.getAll);
router.get("/:id", userHandler.get);
router.put("/:id", userHandler.update);
router.delete("/:id", userHandler.delete);

module.exports = router;
