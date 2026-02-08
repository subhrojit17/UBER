const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/Captain.controller");
const captainModel = require("../models/Captain.model");
const authMiddleware = require("../middlewares/Auth.middleware");

router.get("/vehicle-types", (req, res) => {
  const vehicleTypes =
    captainModel.schema.path("vehicle.vehicleType").enumValues || [];
  res.status(200).json({ vehicleTypes });
});

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long."),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be atleast 3 characters long."),
    body("email").isEmail().withMessage("Please use a valid email address."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long."),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 characters long."),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate number must be atleast 3 characters long."),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1."),
    body("vehicle.vehicleType")
      .isIn(captainModel.schema.path("vehicle.vehicleType").enumValues || [])
      .withMessage(
        "Vehicle type must be either car, two-wheeler, shuttle or auto.",
      ),
  ],
  captainController.registerCaptain,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please use a valid email address."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long."),
  ],
  captainController.loginCaptain,
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile,
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain,
);
module.exports = router;
