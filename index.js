const app = require('./app');
//const config =  require('./config');
//const port =  config.port;

const {port} = require('./config');


//start server
app.listen(port, () => {
  console.log("Server's running, yay.");
});
