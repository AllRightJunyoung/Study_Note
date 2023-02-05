const fs=require('fs')
const path=require('path')

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

// localhost:5001/uploads/image로 요청할시 (서버에있는 파일을 전달할떄 사용하는 미들웨어) //정적 경로로 지정
app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');// 어떤 도메인을 허용하는지
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
  next()
})

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
//잘못된 요청 처리
app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req,file.path,err=>{
      console.log(err)
    })
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
const url=`mongodb+srv://moon2421:a21524679@cluster0.1zxdjlp.mongodb.net/mern?retryWrites=true&w=majority`

mongoose
  .connect(
   url
  )
  .then(() => {
    app.listen(5001);
  })
  .catch(err => {
    console.log(err);
  });
