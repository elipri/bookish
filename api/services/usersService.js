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
  
  //user
  usersService.read = async () => {
    //return users;
    //console.log(req.user);
    const dbusers = await db.collection('users').get();
    //NB! Should fix the order before returning to controller!!
    const users = dbusers.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    //console.log(req.user);
    /* let dusers = [];
    dbusers.forEach(doc => {
      //console.log(doc.id, '=>', doc.data());
      dusers.push(doc.data());
    });
    //console.log(users);
    console.log(dusers[0].firstName); */
    return users;
  }
  
  //users by id
  usersService.readById = async (userId) => {
    const dbuser =  await db.collection('users').doc(userId).get();
    //let id = await userId;
    //console.log(id);
    //const snapshot = await dbusers.where('id', '==', id).get();
    /* snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    console.log(userId); */
    //console.log(snapshot);
    //return users[userId];
    if (!dbuser.exists) {
      return false;
    }
    const user = dbuser.data();
    console.log(user);
    return user;
  }
  
  //creating a new user
  usersService.create = async(user) => {
    
    //user.id = users.length;
    user.password = await hashService.hash(user.password); //salvestab hashitud pw
    //const res = await db.collection('users').doc(user.email).set(user);
    const res = await db.collection('users').add(user);
    console.log(res);
    /* console.log(user);
    console.log(user.password);
    users.push(user); */
  
    //new json from newUser for response
    const userToReturn = { ... user }; //deconstruct
    
    //remove pw
    delete userToReturn.password;
  
    return userToReturn;
    //return res;
  }
  
  //updating existing user
  usersService.update = async (user) => {
      const doc = await db.collection('users').doc(user.id).get();
      if (!doc.exists) {
        return false;
      }
      let update = {};
      // Check if optional data exists
      if (user.firstName) {
          //users[user.id].firstName = user.firstName;
          update.firstName = user.firstName;
      }
      if (user.lastName) {
          //users[user.id].lastName = user.lastName;
          update.lastName = user.lastName;
      }
      if (user.email) {
          //users[user.id].email = user.email;
          update.email = user.email;
      }
      if (user.password) {
          //users[user.id].password = user.password;
          update.password = await hashService.hash(user.password);
      }
  
      const res = await db.collection('users').doc(user.id).update(update);
      return true;
      //const updatedUser = { ... users[user.id]};
      //delete updatedUser.password;
      //return updatedUser;
  }
  
  //deleting user
  usersService.delete = async (id) => {
    //users.splice(id, 1);
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