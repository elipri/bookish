const hashService = require('./hashService');
const db = require('../../db');
const { doc } = require('../../db');

/* const users = [
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
  ]; */
  
  usersService = {};
  
  //READ ALL USERS
  usersService.read = async () => {
    const dbusers = await db.collection('users').get();
    const users = dbusers.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return users;
  }
  
  //READ USER BY ID
  usersService.readById = async (userId) => {
    const dbuser =  await db.collection('users').doc(userId).get();
    if (!dbuser.exists) {
      return false;
    }
    const user = dbuser.data();
    console.log(user);
    return user;
  }
  
  //CREATE A NEW USER
  usersService.create = async(user) => {
    user.password = await hashService.hash(user.password); //salvestab hashitud pw
    const res = await db.collection('users').add(user);
    //new json from newUser for response
    const userToReturn = { ... user }; //destruct
    //remove pw
    delete userToReturn.password;
    if(res.id) {
      return userToReturn;
    } else {
      return false;
    }
  }
  
  //UPDATE USER
  usersService.update = async (user) => {
      const doc = await db.collection('users').doc(user.id).get();
      if (!doc.exists) {
        return false;
      }
      let update = {};
      // Check if optional data exists
      if (user.firstName) {
          update.firstName = user.firstName;
      }
      if (user.lastName) {
          update.lastName = user.lastName;
      }
      if (user.email) {
          update.email = user.email;
      }
      if (user.password) {
          update.password = await hashService.hash(user.password);
      }
  
      const res = await db.collection('users').doc(user.id).update(update);
      return true;
  }
  
  //DELETE USER
  usersService.delete = async (id) => {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
      console.log('No matching user found.');
      return false;
    }
    await db.collection('users').doc(id).delete();
    return true;
  }

  //search user in users by email and return data		
  usersService.readByEmail = async (email) => {		
    //const user = users.find(user => user.email === email);		
    const snapshot =  await  db.collection('users').where('email', '==', email).get();		
    if (snapshot.empty) {		
      return;		
    }		
    const user = {		
      id: snapshot.docs[0].id, //get user id		
      ...snapshot.docs[0].data() //destructure and assign user data		
    };		
    console.log(user);		
    return user;		
  }
  
  module.exports = usersService;