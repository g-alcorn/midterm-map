const bcrypt = require('bcrypt');

module.exports.authorize = (user, password, db) => {
  if (!user || !password) {
    return false;
  } else if (user) {
    //DB query to find user ID
    db
      .query(`SELECT id, password FROM users WHERE name = ${user}`)
      .then(results => {
        console.log(results.rows);
        const { id, password } = results.rows;
        passCheck(id, password);
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
    return false;
  }
};
