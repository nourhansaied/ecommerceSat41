import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { dbConnection } from './db/connection.js';
import { allRoutes } from './src/modules/routes.js';
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
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JjJRNFBzUQr5ynVSBFGtyCLfuBBEoAc3tAP4jXywtFS2QjjaEPiQ2iqsKJPabYQd5TjGTIPhO9ZZCaGcjObfUqV00SIUjx6gv');


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_oF9BdQJNDPjLTN4G15iUl4YM9LH1Xp3o";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
    
  }

  // Handle the event
  if(event.type == "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    console.log(checkoutSessionCompleted);
  }else {
    console.log(`Unhandled event type ${event.type}`);

  }


});

app.use(cors())
app.use("/uploads",express.static("uploads"))
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