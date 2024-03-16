import userModel from "../../../../db/models/user.model.js";
import catchError from "../../../middleware/catchError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import AppError from "../../../utils/appError.js";


export const signUp = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  let addedUser = await user.save();
  let token = jwt.sign({ id: addedUser._id, role:addedUser.role }, process.env.tokenSecretKey);

  res.json({ message: "hello", token });
});

export const signIn = catchError(async (req, res, next) => {
  let { email, password } = req.body;
  let foundedUser = await userModel.findOne({email});
  if(foundedUser) {
  let matched = bcrypt.compareSync(password, foundedUser.password);
  if (matched) {
    let token = jwt.sign({ id: foundedUser._id, role:foundedUser.role }, process.env.tokenSecretKey);
    res.json({ message: "welcome", token });
  } else {
    next(new AppError("invalid password", 422));
  }
}else {
    next(new AppError("user not found", 400));
}
});


export const protectedRoutes = catchError(async(req,res,next) => {
    // 1- token 
    let token = req.header('token')
    // 2- verify token
    jwt.verify(token,process.env.tokenSecretKey,async(err,decoded) => {
        if(err) return next(new AppError(err,401));
        let user = await userModel.findById(decoded.id);
        if(!user) return next(new AppError("user not found",404));
        if(user.changePasswordAt) {
            console.log(decoded.iat, "token");
            let time = Math.round(user.changePasswordAt.getTime() /1000 )
            if(time > decoded.iat ) return next(new AppError("token not valid",401))
        }

        req.user = user
        
        next()

    })
    // 3- check if user exist
    // check when he change the password
})


export const allowTo = (...roles)=> {
    return (req,res,next) =>{
        if(roles.includes(req.user.role)) {
            next()
        }else {
            next(new AppError("not authrized" , 401))
        }


    }

}
export const changePassword = catchError(async(req,res,next) =>{
    console.log(req.params.id);
    let user =  await userModel.findById(req.params.id);
    console.log(user);
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        
        let user = await userModel.findOneAndUpdate({_id:req.params.id}, {password:req.body.newPassword, changePasswordAt: Date.now()},{new:true})

        res.json({message:"udapted",user})

    }else {
        next(new AppError("email or password not valid",400))
    }
})
// Route@alex


