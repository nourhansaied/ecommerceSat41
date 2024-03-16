
import mongoose from "mongoose"
import AppError from '../appError.js';
import multer from "multer";


export const fileUpload =() =>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            console.log(file);
          cb(null, new mongoose.Types.ObjectId + '-' + file.originalname)
        }
      });
      function fileFilter (req, file, cb) {
        console.log(file,"asda");
        if(file.mimetype.startsWith("image")) {
            cb(null, true)
        }else {
            cb(new AppError("invalid format", 401), false)
        }
      
      }
      
      const upload = multer({ storage });
    
      return upload;
}


export const uploadSingleFile = fieldName => fileUpload().single(fieldName)
export const uploadArrayFile = fieldName => fileUpload().array(fieldName,10)
export const uploadFields = fieldsName => fileUpload().fields(fieldsName)
