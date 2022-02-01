import jwt from 'jsonwebtoken';

export const createToken = ({ id }: { id: string }) => {
  const token = jwt.sign({ id }, 'Ffjk#5kk45921kjfkdjf@*#@(*!');
  return token;
}
