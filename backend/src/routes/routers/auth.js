const { Router } = require("express");
const authHandler = require("../handlers/auth");

const router = Router();

router.post("/login", authHandler.login);
router.get("/me", authHandler.getMe);
router.delete("/logout", authHandler.logout);

module.exports = router;
