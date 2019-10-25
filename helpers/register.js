module.exports.registration = (user, passwordHash, db) => {
  console.log('checking current users')
  if (!user || !passwordHash) {
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
          saveUser(user, passwordHash, db);
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
    let response = null;
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

const saveUser = (user, passwordHash, db) => {
  db.query(`INSERT INTO users(email, password)
            VALUES ($1, $2)
            RETURNING *;`,
            [`${user}`, `${passwordHash}`])
    .then(data => {
      console.log(`user ${user} saved in database`);
    })
    .catch(error => {
      console.log(error);
    });
};
