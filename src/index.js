import http from 'http';
import cors from 'cors';
import express from 'express';

const app = express();

app.server = http.createServer(app);

app.use(cors({}));

app.get('/', (req, res) => {
  res.send('Hello W!');
});

app.server.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on port ${app.server.address().port}`);
});
