const authService =  require('../services/authService');
const authController = {};

// Login
// POST
// Required: email, pw
// Optional: none
// Return: token
authController.login = async (req, res) => {
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;
    if (email, password) {
        const token = await authService.login(email, password);
        if (token) {
            // Return token for valid user
            res.status(200).json({
                success: true,
                token: token
            });
        } else {
        // Return error message
            res.status(401).json({
                success: false,
                message: 'Check your credentials'
            });
        }
    } else {
        // Return error message
        res.status(400).json({
            success: false,
            message: 'Required field(s) missing or invalid'
        });
    }
}

module.exports = authController;