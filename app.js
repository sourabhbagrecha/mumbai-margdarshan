const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');
const routes = require('./routes');
const app = express();
const MONGODB_URI = 'mongodb://*****:******@ds1*****5.mlab.com:*****/mumbai-marg';
// const MONGODB_URI = 'mongodb://localhost/mumbai-md';
const PORT = process.env.PORT || 3000;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
      secret: "My little Secret",
      resave: false,
      saveUninitialized: false,
      store: store
  })
);
app.use(flash());
app.use((req, res, next) => {
if(!req.session.user){
  return next();
}
User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => {
    console.log(err);
  })
});
app.use((req, res, next) => {
res.locals.isAuthenticated = req.session.isLoggedIn;
next();
});

app.use(routes);
app.get('/', (req, res, next) => {
  return res.redirect('/search-route');
})



mongoose
  .connect(MONGODB_URI,{ useNewUrlParser: true })
  .then((result) => {
    app.listen(PORT, () => console.log('Listening on', PORT));
  })
  .catch((err)=>{
    console.log(err);
  })
