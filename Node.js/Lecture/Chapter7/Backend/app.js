const express=require('express')
const bodyParser=require('body-parser')
const app= express()

const placesRoutes=require('./routes/places-routes')
const usersRoutes=require('./routes/users-routes')



const HttpError=require('./models/http-error')
app.use(bodyParser.json())
app.use('/api/places',placesRoutes)
app.use('/api/users',usersRoutes)

// 잘못된 요청 처리하기
app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route',404)
    throw error;
})


app.listen(5001);