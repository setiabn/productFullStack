const { Router } = require("express");
const authHandler = require("../handlers/auth");

const router = Router();
const authenticated = require("../../middlewares/authenticated");

router.post("/login", authHandler.login);
router.get("/me", authenticated, authHandler.getMe);
router.delete("/logout", authHandler.logout);

module.exports = router;
