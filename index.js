import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { dbConnection } from './db/connection.js';
import { allRoutes } from './src/modules/routes.js';
import { createdOnlineOrder } from './src/modules/order/controller/order.controller.js';
const app = express()
const port = 3000;

app.use(cors())
app.use("/uploads",express.static("uploads"))

app.post('/webhook', express.raw({type: 'application/json'}),createdOnlineOrder );

app.listen(4242, () => console.log('Running on port 4242'));



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