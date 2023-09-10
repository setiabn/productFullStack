const { Router } = require("express");
const userHandler = require("../handlers/user");
const authenticated = require("../../middlewares/authenticated");

// ================================================================

const router = Router();

router.post("/", authenticated, userHandler.create);
router.get("/", authenticated, userHandler.getAll);
router.get("/:uuid", authenticated, userHandler.get);
router.put("/:uuid", authenticated, userHandler.update);
router.delete("/:uuid", authenticated, userHandler.delete);

module.exports = router;
