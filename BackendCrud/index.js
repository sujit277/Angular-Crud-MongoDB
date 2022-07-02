import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import {employeeRoute} from './Routes/route.js';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors()); 
app.use('/api', employeeRoute);


/* For Connection with Mongo DB*/
mongoose.connect('mongodb://localhost:27017/EmployeeDB').then(() => {
      console.log('Database sucessfully connected')
   },
   (error) => {
      console.log('Database could not connected: ' + error)
   }
)

/* Creating port */
const port = 3000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})