const userModel = require('./model');

function validateUserPayload(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Username ve Password dolu olmalı' });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
}

function validateSignup(req, res, next) {
  try {
    const { username } = req.body;
    const user = userModel.getByUsername(username);
    if (user) {
      res.status(400).json({ message: 'İlgili username mevcut.' });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateLogin(req, res, next) {
  try {
    const existingUser = userModel.login(req.body.username, req.body.password);
    if (!existingUser) {
      res.status(404).json({ message: 'Username veya Password hatalı' });
    } else {
      req.user = existingUser;
      next();
    }
  } catch (error) {
    next(error)
  }
}



module.exports = { validateUserPayload, validateSignup, validateLogin }