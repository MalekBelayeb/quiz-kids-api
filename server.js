
const cors = require("cors");
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

var corsOptions = {
  origin: "http://localhost:8081"
};
// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use(express.static(path.resolve(__dirname, "uploads")))
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));


app.use('/api', require('./server/routes/user-route'))
app.use('/api', require('./server/routes/category-route'))
app.use('/api', require('./server/routes/quiz-route'))

//app.use('api/question', require('./server/routes/router'))
//app.use('api/answer', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
//initRoutes(app);