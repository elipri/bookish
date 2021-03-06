const usersService = require('../services/usersService');
const usersController = {};

//READ ALL USERS
// GET
// Required: none
// Optional: none
// Return: users
usersController.read = async (req, res) => {
    const users = await usersService.read();
    //return all users
    res.status(200).json({
        success: true,
        users: users
    });
}

//READ USER BY ID
// GET
// Required: id
// Optional: none
// Return: user
usersController.readById = async (req, res) => {
    //const userId = req.params.id;
    const userId = typeof(req.params.id) === 'string' && req.params.id.trim().length > 5 ? req.params.id : false;
    if (userId) {
        const user = await usersService.readById(userId);
        if (user) {
            //return user with id
            res.status(200).json({
                success: true,
                user: user
            });
        } else {
            //no user, return cannot find
            res.status(400).json({
                success: false,
                message: 'No user found.'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'No id given'
        });
    }
    
}


//CREATE A NEW USER
// POST
// Required: firstName, lastName, email, password
// Optional: none
// Return: user data
usersController.create = async(req, res) => {
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

    if (firstName && lastName && email && password) {
        const user = {
            firstName,
            lastName,
            email,
            password
        };

        const newUser = await usersService.create(user);
        //return new user
        res.status(201).json({
            success: true,
            user: newUser
        });
    } else {
        //error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

//UPDATE USER
// PUT
// Required: id
// Optional: firstName, lastName, email, password
// Return: 200 if success, 400 if bad request
usersController.update = async (req, res) => {
    //const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    const id = typeof(req.body.id) === 'string' ? req.body.id : false;
    console.log(id);
    if(id) {
        const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
        const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
        const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
        const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 3 ? req.body.password : false;
        
        const user = {
            id,
            firstName,
            lastName,
            email,
            password
        };
        const result = await usersService.update(user);
            if (result) {
                //updated user data
                res.status(200).json({
                    success: true
                    //user: updatedUser
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'No such user found.'
                });
            }
            
    }  else {
        //error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

//DELETE USER
// DELETE
// Required: id
// Optional: none
// Return: 200 if success, 400 if bad request
usersController.delete = async (req, res) => {
    const id = typeof(req.body.id) === 'string' ? req.body.id : false;
    if(id) {
        const result = await usersService.delete(id);
        if (result) {
            //success message
            res.status(200).json({
                success: result,
                message: 'User by ID:'+id+' successfully deleted'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'No such user!'
            });
        }
        
    } else {
        //error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

module.exports = usersController;