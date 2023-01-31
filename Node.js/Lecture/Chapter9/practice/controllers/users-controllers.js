
const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const User=require('../models/user')



const getUsers = async (req, res, next) => {
  let users;
  try {
    users=await User.find({},'-password')
  } catch (err) {
      const error=new HttpError(
        'Fetching users failed, please try again later.',500
      )
      return next(error)
  }
  res.json({users:users.map(user=>user.toObject({getters:true}))})
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, password} = req.body;

  let existingUser;
  try {
    existingUser=await User.findOne({email:email})
  } catch (err) {
    const error=new HttpError(
      'Signing up failed, please try again later',500
    )
      return next(error)
  }
  if(existingUser){
    const error=new HttpError(
      'User exists already, please login instead',422
    )
    return next(error)
  }

 
  const createdUser = new User({
    name,
    email,
    image:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F77%2FGoogle_Images_2015_logo.svg%2F1200px-Google_Images_2015_logo.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FGoogle_Images&tbnid=7fEVakcJUgrsmM&vet=12ahUKEwj0sbbM4vH8AhUwTPUHHdyyAs8QMygAegUIARC3AQ..i&docid=qfPPp-mRFi6Y6M&w=1200&h=412&q=google%20image&ved=2ahUKEwj0sbbM4vH8AhUwTPUHHdyyAs8QMygAegUIARC3AQ',
    password,
    places:[]
  })
  try {
    await createdUser.save()
  } catch (err) {
    const error=new HttpError(
      'Signing Up failed, please try agian',500
    )
    return next(error)
  }

  // id 프로퍼티 앞에 붙은 밑줄 _ 이 제거되어 id에 액세스하기 쉬워짐
  res.status(201).json({user: createdUser.toObject({getters:true})});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser=await User.findOne({email:email})
  } catch (err) {
    const error=new HttpError(
      'Logging in failed, please try again later',500
    )
      return next(error)
  }
  
  if(!existingUser || existingUser.password!==password){
    const error=new HttpError(
      'Invalid credentials, could not login',401
    )
    return next(error)
  }



  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
