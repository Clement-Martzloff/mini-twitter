import fs from 'fs';
import https from 'https';
import http from 'http';
import app from '../../app';

const environment = require(`../environment/${process.env.NODE_ENV}`);

http.createServer(app).listen(8080);
https
  .createServer(
    {
      cert: fs.readFileSync(environment.cert),
      key: fs.readFileSync(environment.key),
    },
    // app,
    (req, res) => {
      res.writeHead(200);
      res.write('ok!');
      res.end();
    },
  )
  .listen(443);
