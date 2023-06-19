module.exports = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  console.log("create Error");
  throw error;
};
