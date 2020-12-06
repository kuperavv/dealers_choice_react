const express = require('express');
const PORT = process.env.PORT || 8080;

const app = express();

const init = async () => {
  try {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (er) {
    console.log(er);
  }
};

init();
