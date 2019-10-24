const bcrypt = require('bcrypt');

module.exports.authorize = (user, password, db) => {
  if (!user || !password) {
    return false;
  } else if (user) {
    //DB query to find user ID
    db
      .query(`SELECT name, password
              FROM users
              WHERE name = $1 AND password = $2`,
              [`${user}`, `${password}`])
      .then(results => {
        console.log(results);
        const { user, password } = results.rows;
        passCheck(user, password);
      })
      .catch(error => {
        return false;
      });
    }
};

module.exports.passCheck = (password) => {
  //bcrypt compare hashes
  if(!password) {
    return false;
  } else {
    bcrypt.compareSync(password, );
  }
};
