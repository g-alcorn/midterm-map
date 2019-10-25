const bcrypt = require('bcrypt');

module.exports.authorize = (user, inputHash, db) => {
  if (!user || !inputHash) {
    return false;
  } else if (user) {
    //DB query to find user ID
    db
      .query(`SELECT password
              FROM users
              WHERE name = $1 AND password = $2`,
              [`${user}`, `${inputHash}`])
      .then(results => {
        console.log(results);
        const { password } = results.rows;
        return passCheck(inputHash, password);
      })
      .catch(error => {
        return false;
      });
    }
  }

module.exports.passCheck = (inputHash, password) => {
  //bcrypt compare hashes
  return bcrypt.compareSync(inputHash, password);
};
