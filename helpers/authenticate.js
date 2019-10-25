const bcrypt = require('bcrypt');

// module.exports.authorize = (user, password, db) => {
//   if (!user || !password) {
//     return false;
//   } else if (user) {
//     //DB query to find user ID
//     db
//       .query(`SELECT name, password
//               FROM users
//               WHERE name = $1`,
//               [`${user}`])
//       .then(results => {
//         const { user, password } = results.rows[0];
//       })
//       .catch(error => {
//         return false;
//       });
//     }
//   }

module.exports.passCheck = (dbpassword, password) => {
  //bcrypt compare hashes
  if(!password) {
    return false;
  } else {
    if(bcrypt.compareSync(dbpassword, password)) {
      return true;
    } else {
      return false;
    }
  }
};


