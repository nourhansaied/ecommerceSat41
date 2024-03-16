
import mongoose from 'mongoose'

export const dbConnection = () =>{
    mongoose.connect(process.env.PRODUCTION_DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

    
}