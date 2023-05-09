const express = require('express');
const server = express();
const usermodel = require('./model');
const { validateUserPayload, validateSignup, validateLogin } = require('./middleware')

server.use(express.json());

server.get('/api/kullanicilar', (req, res) => {
  try {
    const users = usermodel.get()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı listesi alınırken hata oluştu' });
  }
});


server.post('/api/kayitol', validateUserPayload, validateSignup, (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = usermodel.insert({ username: username, password: password });
    res.status(201).json({ message: `Yeni kullanıcı ${newUser.id} id ile oluşturuldu.` })
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı kayıt olurken hata oluştu' });
  }
});


server.post('/api/giris', validateUserPayload, validateLogin, (req, res) => {
  try {
    res.status(200).json({ message: `Hoşgeldin ${req.user.username}` });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı login olurken hata oluştu.' })
  }
});

module.exports = server;