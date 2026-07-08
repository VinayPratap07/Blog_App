const { Router } = require("express");
const { createComment } = require("../Controllers/commments_controllers");

const router = Router();

router.post("/:id", createComment);

module.exports = router;
