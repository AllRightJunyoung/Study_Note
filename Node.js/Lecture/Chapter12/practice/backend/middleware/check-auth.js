const HttpError = require("../models/http-error")
const jwt=require('jsonwebtoken')

// 수신하는 요청의 토큰의 유효성을 검사

module.exports=(req,res,next)=>{

  // http 메소드는 GET 외에 모든 요청을 OPTIONS로 받음
    if(req.method==='OPTIONS'){
      return next()
    }
 
    try {
     const token=req.headers.authorization.split(' ')[1] // Authorization: 'Bearer Token'
     if(!token){
       throw new Error('인증 실패')
     }
     
    //  토큰 유효성검사
     const decodedToken=jwt.verify(token,'supersecret_dont_share')
     req.userData={userId:decodedToken.userId}
     next()

    } catch (err) {
        // split 연산 실패
        const error=new HttpError('인증 실패!',401)
        return next(error)
        
    }
   
    
}