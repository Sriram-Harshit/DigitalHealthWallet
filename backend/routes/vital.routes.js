const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/vital.controller");

router.post("/addvital", auth, controller.addVital);
router.get("/getvitals", auth, controller.getVitals);

module.exports = router;
