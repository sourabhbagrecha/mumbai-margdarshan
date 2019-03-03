const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Station = require('./models/station');

const routes = require('./routes');
const app = express();
const MONGODB_URI = 'mongodb://herokuapp:heroku123$@ds159025.mlab.com:59025/mumbai-marg';
const PORT = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.get('/', (req, res, next) => {
  res.send('Hello!');
})



mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true })
  .then((result) => {
    app.listen(PORT, () => console.log('Listening on', PORT));
  })
  .catch((err)=>{
    console.log(err);
  })