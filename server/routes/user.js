const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

// update,delete,update and read
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/adduser',userController.form);
router.post('/adduser',userController.create);

// deleting the data
router.get('/:id',userController.delete);

// editing user data
router.get('/edituser/:id',userController.edit);
router.post('/edituser/:id',userController.update)

// viewing the data
router.get('/viewuser/:id',userController.viewall);

module.exports=router;