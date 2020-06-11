const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require ('mongoose')

const sgMail = require('@sendgrid/mail');

const transaction = require('./models/certauth.model');
const { errorHandler } = require('./helpers/dbErrorHandling')

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

//Load all routes
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

//config for only development
if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
    //Morgan give information about each request
    //Cors it's allow to deal with react for localhost at port 3000 without any problem
}
//Use Routes
app.use('/api/',authRouter);
app.use('/api', userRouter);


//client-mail
app.post('/api/smail', (req, res, next) => {
    sgMail.setApiKey(process.env.MAIL_KEY);
    //console.log(req.body)
    //console.log(req.body.z)
    const email = req.body.z
    const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        fromname: 'SADG University',
        subject: 'Graduation Certificate',
        html: `
                <h1>Greetings from SADG University</h1>
                <br>
                <h2>Hello ${req.body.y}</h1>
                <br>
                <span style="font-weight: 10px">This is your certificate id :  <strong>${req.body.x}</strong></span>
                <br>
                <a href="https://sadg-university.herokuapp.com/">Click here to view Certificate</a> 
                <br>
                <h2>Management, Principal, Faculty Congratulates you</h2>
                <br>
                <h3> We wish you All the Best for your Future Endeavours</h3>
                <
              `,
        };
        
      sgMail.send(emailData).then(sent => {
        return res.json({
          message: `Email has been sent to ${email}`
        });
      }).catch(err => {
        return res.status(400).json({
          success: false
        });
      });

      const tid = req.body.t
      const usn = req.body.u
      const cert_id = req.body.x

      console.log(tid)
      
      const certx = new transaction({
        usn,
        tid,
        email,
        cert_id
      });

      certx.save((err, certx) => {
        if (err) {
          console.log('Save error', errorHandler(err));
          return res.status(401).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: 'Transaction details sent!!',
          });
        }
      });
})

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



app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
});
const PORT = process.env.PORT

var listener = app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}`); //Listening on port 8888
});