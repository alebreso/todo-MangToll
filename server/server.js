const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesCards = require('./routes/cards')

const port = process.env.PORT || 4000;
const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

mongoose.connect('mongodb+srv://AlBreso:AKkk7mXR9ElPNYpp@cluster0-9yayy.mongodb.net/todo?retryWrites=true',{ useNewUrlParser: true })
  .then(()=>{
    console.log('mongoDB connected')
  })
  .catch(err => console.log(err));
  
app.use(cors());
app.use(bodyParser.json());
app.use(routesCards);

app.listen(port,() => console.log(`service started on port ${port}`));
