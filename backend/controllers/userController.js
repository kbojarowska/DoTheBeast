const registerUser = (req, res) => {
  res.send('Register route');
};

const loginUser = (req, res) => {
  res.send('Login route');
};

module.exports = {
  registerUser,
  loginUser,
};
