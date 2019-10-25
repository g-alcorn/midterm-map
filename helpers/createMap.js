
module.exports.createMap = function(db, params) {
  return db
  .query(`
  INSERT INTO maps(title, description)
  VALUES ($1, $2)
  RETURNING *;`,
  [`${params.title}`, `${params.description}`])
  .then(res => res.rows[0]);
}
