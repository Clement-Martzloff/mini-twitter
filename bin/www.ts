import fs from 'fs';
import https from 'https';
import http from 'http';
import app from '../src/infra/api/app';
import { environment } from '../src/env';

http.createServer(app).listen(8080);
https
  .createServer(
    {
      cert: fs.readFileSync(environment.cert),
      key: fs.readFileSync(environment.key),
    },
    app
  )
  .listen(443);
