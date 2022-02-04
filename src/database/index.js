import mysql from 'mysql';

const db = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b176e1cefdafa9',
    password: '6b8c5581',
    database: 'heroku_f95bd7e162a7bad'
});

export const query = async (query, values = []) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(query, values, (err, res) => {
          if (err) {
              reject(err);
          } else {
              resolve(res);
          }
      });
    });
    return result;
  } catch (err) {
      console.log('This err happened on db query', err);
  }
};



