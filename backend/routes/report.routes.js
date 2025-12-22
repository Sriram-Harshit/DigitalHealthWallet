const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/report.controller");

router.post("/upload", auth, upload.single("file"), controller.uploadReport);
router.get("/getreports", auth, controller.getReports);
router.get("/:id/view", auth, controller.viewReport);

module.exports = router;
