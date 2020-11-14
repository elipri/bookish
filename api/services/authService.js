const usersService = require('../services/usersService');
const hashService = require('./hashService');
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
    const user = usersService.readByEmail(email);
    if (user) {
        const match = await hashService.compare(password, user.password);
        if (match) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports =  authService;