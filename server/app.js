const express = require('express');
const app = express();
const jsonParser = express.json();


const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('qwerty', 'egor', '1234', {
  host: 'localhost',
  dialect:'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });


  class User extends Sequelize.Model {}
  User.init({
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  }, {
    sequelize,
    // options
  });


app.get('/users',(req,res,next) =>{
    res.send('All users:');
})

app.post('/users/create', jsonParser, (req, res,next)=> {
    const body = req.body();
    res.json(body);
})

app.use((req,res,next)=>{
    console.log("USE!!!");
    next();
})

app.get('/test', (req,res,next) =>{
    console.log('One');
    next();
},
(req,res,next) =>{
    console.log('Two');
    next();
},
(req,res,next) =>{
    console.log('Three');
    next();
},
(req,res,next) =>{
    console.log('Four');
    next();
})

app.listen(3000,() =>{
    console.log("Seerver is working at 3000 port");
});