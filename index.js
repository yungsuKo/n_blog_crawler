const express = require('express');

const app = express();
app.get('/', require('./routes/controller/home.controller'));

app.listen(3000, () => {
  console.log('3000 is running');
});
