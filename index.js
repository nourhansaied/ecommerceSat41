import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import { dbConnection } from './db/connection.js';
import { allRoutes } from './src/modules/routes.js';
const app = express()
const port = 3000;


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