const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('/src'));

app.get('/', require('./routes/controller/home.controller'));
app.use('/api', require('./routes/api/index'));

app.listen(3000, () => {
  console.log('3000 is running');
});
