const express = require('express');
const router = express.Router();
const auth = require('../auth/authjwt')

//import controllers users
const userController = require("../controllers/user.controller");





//user routers
router.post("/create", userController.addUser);
router.put("/edit/:user_id", auth.commonAuth, userController.Update);
router.delete("/delete/:user_id", auth.commonAuth, userController.delete);
router.get("/view/:user_id", auth.commonAuth, userController.viewUser);
router.get("/list", auth.commonAuth, userController.getAll);
router.get("/:user_id/:status", auth.commonAuth, userController.user_status);

// router.get('/one-to-one', AuthController.oneToOne)

// router.get('/belongsto', AuthController.belongsTo)




// router.post("/login",
//      usersController.signin);


module.exports = router
    // module.exports = app => {
    //     const usersController = require("../controllers/users/users.controller");

//     var router = require("express").Router();

//     // Create a new user
//     router.post("/", usersController.create);

//     // // Retrieve all Tutorials
//     // router.get("/", tutorials.findAll);

//     // // Retrieve all published Tutorials
//     // router.get("/published", tutorials.findAllPublished);

//     // // Retrieve a single Tutorial with id
//     // router.get("/:id", tutorials.findOne);

//     // // Update a Tutorial with id
//     // router.put("/:id", tutorials.update);

//     // // Delete a Tutorial with id
//     // router.delete("/:id", tutorials.delete);

//     // // Delete all Tutorials
//     // router.delete("/", tutorials.deleteAll);

//     app.use('/api/users', router);
//   };