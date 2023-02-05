const multer=require('multer')
const {v4}=require('uuid')
const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
}

const fileUpload=multer({
    // 파일 용량 제한
    limits:500000,
    // 데이터가 저장될 위치를 제어
    storage:multer.diskStorage({
        // 저장될 파일경로
        destination:(req,file,cb)=>{
            cb(null,'uploads/images')
        },
        filename:(req,file,cb)=>{
            const ext=MIME_TYPE_MAP[file.mimetype]
            // 첫번쨰인자로 error를전달해 오류를 발생시켜도됨 
            // 2번쨰인자로인해 올바른 확장자와 무작위의 이름을 가진 파일이 생성된다.
            cb(null,v4()+'.'+ext)
        }
    }),
    // 파일이 잘못된지를 검증한다.
    fileFilter:(req,file,cb)=>{
        // 검증이 실패한 경우 첫번째 인수로 error를 가지고 호출되고, 성공한경우 null을 첫번쨰 인수로해서 호출
        const isValid=!!MIME_TYPE_MAP[file.mimetype] //undfiend | null 이면 false
        let error=isValid ? null : new Error('Invalid mime type')
        cb(error,isValid)
    }

})
module.exports=fileUpload