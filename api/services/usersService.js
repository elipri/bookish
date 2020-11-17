const hashService = require('./hashService');
const users = [
    {
        id: 0,
        firstName: 'Elina',
        lastName: 'Prints',
        email: 'elina.prints@gmail.com',
        password: '$2b$10$XMMlrUKPUOiebd.sFnjxeek1u9OdiMZhWWbdFjpuNEZO4.2RpqmuO' //elina
    },
    {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        password: '$2b$10$1zIop5OTzCftHXN43wkY1Oq6ATOYNaUErdxa43Lf8bRYAsWyr3PD2' //johnny
    }
  ];
  
  usersService = {};
  
  //user
  usersService.read = () => {
    return users;
  }
  
  //users by id
  usersService.readById = (userId) => {
    return users[userId];
  }
  
  //creating a new user
  usersService.create = async(user) => {
    user.id = users.length;
    user.password = await hashService.hash(user.password); //salvestab hashitud pw
    console.log(user);
    console.log(user.password);
    users.push(user);
  
    //new json from newUser for response
    const userToReturn = { ... user }; //deconstruct
    //remove pw
    //delete userToReturn.password;
  
    return userToReturn;
  }
  
  //updating existing user
  usersService.update = (user) => {
      // Check if optional data exists
      if (user.firstName) {
          users[user.id].firstName = user.firstName;
      }
      if (user.lastName) {
          users[user.id].lastName = user.lastName;
      }
      if (user.email) {
          users[user.id].email = user.email;
      }
      if (user.password) {
          users[user.id].password = user.password;
      }
  
      const updatedUser = { ... users[user.id]};
      delete updatedUser.password;
      return updatedUser;
  }
  
  //deleting user
  usersService.delete = (id) => {
    users.splice(id, 1);
    return true;
  }

  //search user in users by email and return data
  usersService.readByEmail = (email) => {
    const user = users.find(user => user.email === email);
    return user;
  }
  
  module.exports = usersService;