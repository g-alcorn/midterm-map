const bcrypt = require('bcrypt');

module.exports.registration = (user, password, db) => {
  console.log('checking current users')
  if (!user || !password) {
    //tell server fields are empty
    return false;
  } else {
    console.log('db query')
    return db.query(`SELECT email
              FROM users
              WHERE email = $1;`,
              [`${user}`])
      .then(data => {
        if (!data.rows) {
          //tell server that user already exists
          console.log('user already exists');
          return false;
        } else {
          console.log('user does not already exist. trying to save to db')
          saveUser(user, password, db);
        }
      })
      .catch(err => {
        console.log('db query error! ' + err)
        //res.status(500)
        // .json({ error: err.message });
        return false;
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

const saveUser = (user, password, db) => {
  db.query(`INSERT INTO users(email, password)
            VALUES ($1, $2)
            RETURNING *;`,
            [`${user}`, `${bcrypt.hashSync(password, 10)}`])
    .then(data => data.rows[0]);
}

// module.exports.saveUser
