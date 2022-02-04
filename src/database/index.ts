import mysql from 'mysql';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'calendar'
});

export const query = async (query: string, values = [] as any) => {
  try {
    const result = await new Promise((resolve, reject) => {
        db.query(query, values, (err: any, res: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    console.log({ result });
    return result;
  } catch (err) {
      console.log('This err happend on db query', err);
  }
};



