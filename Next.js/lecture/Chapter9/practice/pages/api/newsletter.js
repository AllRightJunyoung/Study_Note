import  {MongoClient} from 'mongodb'
import { connectDatabase,insertDocument } from '../../helpers/db-util';


async function handler(req,res){
    if(req.method==='POST'){
    const userEmail=req.body.email
    
    
    if(!userEmail || !userEmail.includes('@')){
        res.status(422).json({message:'Invalid email address.'})
        return;
    }
    // DB관련 코드
    let client;
    try {
       client=await connectDatabase()
    } catch (error) {
        res.status(500).json({message:'Connecting to the database failed!'})
        return
    }
    try {  
        //  이메일 컬렉션에 새로운 이메일데이터 삽입
        await insertDocument(client,'newsletter',{email:userEmail})
        client.close()
    } catch (error) {
        res.status(500).json({message:'Inserting data failed!'})
        return
    }

    res.status(201).json({message:'Sigend up!'})
    
    }
}
export default handler