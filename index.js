// initialize and start up the server

const express = require('express');
const helmet = require('helmet');

const port = process.env.PORT || 5000;

const defaultPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hello Server</title>
    </head>
    <body>
        <h1>Hello, Server!</h1>
        <h3>Available endpoints:</h3>
        <ul>
            <li>/api/register</li>
            <li>/api/login</li>
            <li>/api/users</li>
        </ul>
        <hr>
        <p><span style="font-style:italic">
            Server listening on port ${port}
        </span></p>
    </body>
    </html>
`;

const server = express();
server.use(helmet());
server.use(express.json());

// default 'proof of life' endpoint
server.get('/', (req, res, next) => {
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
