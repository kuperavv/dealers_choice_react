const express = require('express');
const { db } = require('./db/index');
const seed = require('../bin/seed');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./api'));

// This middleware will catch any URLs resembling a file extension
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const init = async () => {
  try {
    if (process.env.SYNC) {
      await db.sync({ force: true });
      await seed();
    }
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (er) {
    console.log(er);
  }
};

init();
