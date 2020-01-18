// initialize and start up the server

const express = require('express');
const helmet = require('helmet');

const port = process.env.PORT || 5000;

const server = express();
server.use(helmet);
server.use(express.json());

// default 'proof of life' endpoint
server.get('/', (req, res, next) => {
  const defaultPage = `
        <h1>Hello, World!</h1>
        <p>Server listening on port ${port}</p>
    `;
  res.send(defaultPage);
});

// catch-all error handler
server.use((err, req, res, next) => {
  console.error('Error:', err);

  res.status(500).json({
    message: 'Server error',
  });
});

// start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
