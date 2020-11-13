const pingController = {};

// Endpoint for checking if API is alive (response 200 OK means, it is working)
// GET - ping
// Required values: none
// Optional values: none
// Returns: status 200 - OK and { success: true } message
pingController.ping = (req, res) => {
  res.status(200).json({
      success: true
  });
};

module.exports = pingController;