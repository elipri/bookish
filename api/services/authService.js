const usersService = require('./usersService');
const hashService = require('./hashService');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const authService = {};

//req email, pw; return true/false
/* authService.login = async (email, password) => {
    const user = usersService.readByEmail(email);
    if(user) {
        const match = hashService.compare(password, user.password);
        if (match) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
} */

authService.login = async (email, password) => {
    const user = await usersService.readByEmail(email);
    //console.log('authserv:'+user);
    if (user) {
        const match = await hashService.compare(password, user.password);
        if (match) {
            // Generate token and return
            const token = jwt.sign(
                //{ email: user.email },
                { id: user.id },
                config.jwtSecret,
                { expiresIn: 60 * 60 * 5 } // When will the token expire? In 60*60 seconds: 1h
            );
            //console.log(token); // Jwt.io - debugger: to check the contents
            return token;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports =  authService;