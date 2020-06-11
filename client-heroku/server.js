const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require ('mongoose')
const transaction = require('./models/certauth.model');
const cors = require('cors')
const path = require('path')
//Config .env to ./config/config.env
require('dotenv').config({
    path:'./config/config.env'
})


//Connect to Database
const uri = process.env.MONGO_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log ("MongoDB database connection established successfully");
})


//Use bodyParser
app.use(bodyparser.json())

//config for only development
//config for only development


    //Morgan give information about each request
    //Cors it's allow to deal with react for localhost at port 3000 without any problem
app.post('/api/idfetch', (req, res, next) => {
  const usn = req.body.id
  //console.log(usn)
  transaction.findOne({
      usn
    }).exec((err, tid) => {
      return  res.send(tid)
  })
});

app.get('/api/getrapi', (req, res, next) => {
      return  res.send(process.env.INFURA_API_KEY)
});

app.get('/api/rdefault', (req, res, next) => {
  return  res.send(process.env.ROPSTEN_DEFAULT_ACCOUNT)
});



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
  });
  app.use(cors());
}

const PORT = process.env.PORT

var listener = app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`); //Listening on port 8888
});
