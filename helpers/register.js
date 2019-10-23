module.exports = (user, password, db) => {
  const registration = (user, password, db) => {
    if (!user || !password) {
      //tell server fields are empty
      return false;
    } else {
      db.query(`SELECT email FROM users WHERE email = ${user}`)
        .then(data => {
          if (!data.rows) {
            //tell server that user already exists
            return false;
          } else {
            return saveUser(user, password, db);
          }
        })
        .catch(err => {
          res.status(500)
          .json({ error: err.message });
          return false;
        })
    }
  };

  const saveUser = (user, password, db) => {
    const queryString = `INSERT INTO users VALUES ($1, $2)`;
    db.query(queryString, [user, password])
      .then(data => {
        //respond
        return true;
      })
      .catch(err => {
        res.status(500);
        return false;
      });
  }
};
