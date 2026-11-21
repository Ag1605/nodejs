
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const allowRoles = require("../middleware/rolemiddleware");


// ======================================
// PROFILE ROUTE
// Any authenticated user can access
// ======================================

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.status(200).json({

            message: "Profile accessed successfully",

            user: req.user

        });

    }
);


// ======================================
// ADMIN ROUTE
// Only admin can access
// ======================================

router.get(
    "/admin",
    authMiddleware,
    allowRoles("admin"),
    (req, res) => {

        res.status(200).json({

            message: "Welcome Admin"

        });

    }
);


// ======================================
// MANAGER ROUTE
// Admin and manager can access
// ======================================

router.get(
    "/manage",
    authMiddleware,
    allowRoles("admin", "manager"),
    (req, res) => {

        res.status(200).json({

            message: "Welcome Manager or Admin"

        });

    }
);


// ======================================
// DASHBOARD ROUTE
// All authenticated roles can access
// ======================================

router.get(
    "/dashboard",
    authMiddleware,
    allowRoles("admin", "manager", "user"),
    (req, res) => {

        res.status(200).json({

            message: "Dashboard accessed successfully",

            user: req.user

        });

    }
);


module.exports = router;
