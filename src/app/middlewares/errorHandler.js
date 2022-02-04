const errorHandler = (error, req, res, next) => {
  console.log('Error Handler', error);
  res.sendStatus(500);
}

export default errorHandler;
