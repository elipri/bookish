const jwt = require('jsonwebtoken');
const config = require('../../config');
const isLoggedIn = (req,res,next) => {
    //console.log(req.headers.authorization);
    try{
        const token = req.headers.authorization.substring(7);
        //console.log(token);
        const verified = jwt.verify(token, config.jwtSecret);
        //kehtivuse kontroll?
        //console.log(verified);
        if(verified) {
            req.user = verified.id; //middleware saab muuta req objekti ja annab selle edasi järgmistele controlleritele
            next();
        }
    } catch(error) {
        //console.log(error);
        let message = error.name;
        if(error.name === 'TokenExpiredError'){
            message = 'Token expired at '+error.expiredAt+'! Please log in again!';
        } else {
            message = 'Invalid token!';
        }
        res.status(402).json({
            success: false,
            message: message
        });
    }
    
    //next();
}

module.exports = isLoggedIn;