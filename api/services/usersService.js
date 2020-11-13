const users = [
    {
        id: 0,
        firstName: 'Elina',
        lastName: 'Prints',
        email: 'elina.prints@gmail.com',
        password: 'elina'
    },
    {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        password: 'johnny'
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
  usersService.create = (user) => {
    user.id = users.length;
    users.push(user);
  
    //new json from newUser for response
    const userToReturn = { ... user };
    //remove pw
    delete userToReturn.password;
  
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
  
  module.exports = usersService;