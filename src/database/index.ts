import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'calendar',
});

client.connect();

export const query: any = async (query: any, values = [] as any) => {
  const { rows } = await client.query(query, values);
  return rows;
}


