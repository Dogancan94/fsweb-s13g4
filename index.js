const server = require('./api/server');
require('dotenv').config()

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})