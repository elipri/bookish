const jwt = require('jsonwebtoken');
const config = require('../../config');
const isLoggedIn = (req,res,next) => {
    //console.log(req.headers.authorization);
    try{
        const token = req.headers.authorization.substring(7);
        //console.log(token);
        const verified = jwt.verify(token, config.jwtSecret);
        //console.log(verified);
        if(verified) {
            req.user = verified.email; //middleware saab muuta req objekti ja annab selle edasi järgmistele controlleritele
            next();
        }
    } catch(error) {
        console.log(error);
        res.status(402).json({
            success: false,
            message: 'Invalid token'
        });
    }
    
    //next();
}

module.exports = isLoggedIn;