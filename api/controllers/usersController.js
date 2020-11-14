const usersService = require('../services/usersService');
const usersController = {};

usersController.read = (req, res) => {
    const users = usersService.read();
    //all users
    res.status(200).json({
        success: true,
        users: users
    });
}

usersController.readById = (req, res) => {
    const userId = req.params.id;
    if (userId) {
        const user = usersService.readById(userId);
        //return user with id
        res.status(200).json({
            success: true,
            user: user
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No id provided'
        });
    }
    
}

usersController.create = async(req, res) => {
    const firstName = typeof(req.body.firstName) === 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName : false;
    const lastName = typeof(req.body.lastName) === 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

    console.log(req.body);
    console.log(firstName, lastName, email, password);

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

usersController.update = (req, res) => {
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    
    if(id || id === 0) {
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
    
        const updatedUser = usersService.update(user);
            //updated user data
            res.status(200).json({
                success: true,
                user: updatedUser
            });
    }  else {
        //error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

usersController.delete = (req, res) => {
    const id = typeof(req.body.id) === 'number' ? req.body.id : false;
    if(id || id === 0) {
        const result = usersService.delete(id);
        //success message
        res.status(200).json({
            success: result
        });
    } else {
        //error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

module.exports = usersController;