//
const { Router } = require("express");
const producthandler = require("../handlers/product");
const authenticated = require("../../middlewares/authenticated");
//
const router = Router();
// =======================================================
router.post("/", authenticated, producthandler.create);
router.get("/", authenticated, producthandler.getAll);
router.get("/:uuid", authenticated, producthandler.get);
router.put("/:uuid", authenticated, producthandler.update);
router.delete("/:uuid", authenticated, producthandler.delete);

module.exports = router;
