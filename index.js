import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { dbConnection } from './db/connection.js';
import { allRoutes } from './src/modules/routes.js';
import { creatOnline } from './src/modules/order/controller/order.controller.js';
const app = express()
const port = 3000;

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.


// This is your Stripe CLI webhook secret for testing your endpoint locally.


app.use(cors())
app.use("/uploads",express.static("uploads"))
app.post('/webhook', express.raw({type: 'application/json'}), creatOnline);

app.use(express.json());


dbConnection()



allRoutes(app)


app.get('/', (req, res) => res.send('Hello World!'))


app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.statusCode).send({message:err.message, stack: err.stack})
  })
  
app.listen( process.env.PORT ||  port, () => console.log(`Example app listening on port ${port}!`))


// onLine ... 30min 
// docker 
// qrCode
// cron job