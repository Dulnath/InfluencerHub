const router = require("express").Router();
const {
  AddUsers,
  EmailVerify,
  getById,
  getUsers,
  UpdateUser,
} = require("../controller/users");

//user registration routes
router.post("/", AddUsers);
router.get("/getUsers", getUsers);
router.get("/:id/verify/:token/", EmailVerify);
router.get("/getuser/:id", getById);
router.put("/getuser/:id", UpdateUser);

module.exports = router;
