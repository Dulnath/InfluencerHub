const router = require("express").Router();
const {
  AddUsers,
  EmailVerify,
  getById,
  getUsers,
} = require("../controller/users");

//user registration routes
router.post("/", AddUsers);
router.get("/getUsers", getUsers);
router.get("/:id/verify/:token/", EmailVerify);
router.get("/getuser/:id", getById);

module.exports = router;
