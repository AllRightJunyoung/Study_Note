# API 라우터 섹션

## API 라우트란?
- 특수한 형태의 URL로 Next.js 애플리케이션에 추가하여 일반적인 브라우저 요청을 받고 데이터베이스에 저장하거나 , 요청에 맞는 데이터를 클라이언트에 전달
  - HTMl 파일이 아닌 JSON 포맷
- Next에서는 Rest API라우트를 쉽게구축이가능함
> REST API같은것을 NEXT.JS에서 붙인다고 생각하면됨 (POST,GET) 

## API 라우트 프로젝트에 셋팅하는법
- pages에 api라는 폴더를 만들어야 Next.js에서 인식한다.
  - pages/api/feedback.js => localhost:3000/api/feedback
  - api폴더는 React컴포넌트로 내보내지않는다.
> Node.js의 라우팅과 같다봄 feedback.js파일을 보면알듯

## 사전 렌더링 페이지에 API라우트 사용하기
> 사전렌더링은 클라이언트 사이드의 번들사이즈에 포함되지 않는 장점
~~~ js
//pages/feedback/index.js 
import { buildFeedbackPath, extractFeedback } from "../api/feedback"


function FeedbackPage(props){
    return (
        <ul>
        {props.feedbackItems.map(item=>
        <li key={item.id}>
        {item.text}
        </li>)}
      </ul>
    )
}
export async function getStaticProps(){
    const filePath=buildFeedbackPath()
    const data=extractFeedback(filePath)
    return {
        props:{
            feedbackItems:data,
        }
    }    
}
export default FeedbackPage
~~~

## 사전렌더링 페이지에서 동적 API라우트 생성 & 사용하기
1. api 폴더에 [이름].js 만듬
2. 1번에서 만든파일안에 handler구성 (query메소드로) [feedbackID.js] 보면됨
3. pre-rendering하는 pages의 폴더안에서 사용 
> 프로젝트 소스코드보면 자세히나와있음
