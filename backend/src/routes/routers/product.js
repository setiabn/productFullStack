//
const { Router } = require("express");
const producthandler = require("../handlers/product");
const authenticated = require("../../middlewares/authenticated");
//
const router = Router();
// =======================================================
router.post("/", authenticated, producthandler.create);
router.get("/", authenticated, producthandler.getAll);
router.get("/:id", authenticated, producthandler.get);
router.put("/:id", authenticated, producthandler.update);
router.delete("/:id", authenticated, producthandler.delete);

module.exports = router;
