const bcrypt = require('bcrypt');

module.exports.registration = (user, password, db) => {
  console.log('checking current users')
  if (!user || !password) {
    //tell server fields are empty
    return false;
  } else {
    console.log('db query')
    db.query(`SELECT email FROM users WHERE email = ${user}`)
      .then(data => {
        if (!data.rows) {
          //tell server that user already exists
          console.log('user already exists');
          return false;
        } else {
          console.log('user does not already exist. trying to save to db')
          return saveUser(user, password, db);
        }
      })
      .catch(err => {
        console.log('db query error! ' + err)
        //res.status(500)
        .json({ error: err.message });
        //return false;
      })
  }
}

module.exports.validateForm = (username, password) => {
    let response = '';
    console.log('validating form')
    if (!username) {
      response += 'Please enter email!';
    }

    if (!password) {
      response += 'Please enter password!';
    }

    if (password.length < 3) {
      response += 'Please use a password of >3 characters!';
    }

    return response;
};

module.exports.saveUser = (user, password, db) => {
  const queryString = `INSERT INTO users VALUES ($1, $2)`;
  db.query(queryString, [user, password])
    .then(data => {
      //respond
      console.log('user saved to db')
      return true;
    })
    .catch(err => {
      res.status(500);
      return false;
    });
};
