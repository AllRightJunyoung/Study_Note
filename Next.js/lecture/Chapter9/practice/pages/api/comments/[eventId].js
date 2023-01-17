import { connectDatabase, insertDocument ,getAllDocuments} from '../../../helpers/db-util' 

async function handler(req,res){
    const eventId=req.query.eventId
    let client;
    try {
        client=await connectDatabase()

    } catch (error) {
        res.status(500).json({message:'Connectingto the database failed!'})
        client.close()
        return
    }

    if(req.method==='POST'){
        const {email,name,text}=req.body// add server-side validation
        
        if(!email.includes('@') || !name || name.trim()==='' || !text || text.trim()===''){
            res.status(422).json({meesage:'Invalid input.'})
            return
        }

        let result;
        try {
            result=await insertDocument(client,'comments',newComment)
        } catch (error) {
            res.status(500).json({message:'Inserting comment failed!'})
            return
        }
        newComment._id=result.insertedId;
        res.status(201).json({message:'Added Comment',comment:newComment})
 
    }
    if(req.method==='GET'){
        try {
        // comments컬렉션을 찾아서 내림차순으로 배열로 가져옴
            const documents=getAllDocuments(client,'comments',{_id:-1})
            res.status(200).json({comments:documents})   
        } catch (error) {
            res.status(500).json({message:'Getting comments failed.'})
            return 
        }
    }
    client.close()
}
export default handler