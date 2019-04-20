export class Database {
  constructor(mysql, config) {
    this.connection = mysql.createConnection(config);
  }

  query(sql, placeholders = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, placeholders, function(error, rows, fields) {
        if (error) return reject(error);
        return resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

// module.exports.Database = Database;
