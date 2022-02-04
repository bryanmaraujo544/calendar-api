import jwt from 'jsonwebtoken';

export const createToken = ({ id }) => {
  const token = jwt.sign({ id }, 'Ffjk#5kk45921kjfkdjf@*#@(*!');
  return token;
}
