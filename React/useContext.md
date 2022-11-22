# useContext 훅
- 내게 필요한 Props를 글로벌하게 사용할수 있게 도와준다
- props drilling을 방지하게 함

## 코드 예시
~~~tsx
import {createContext} from 'react'

//  1. Context 생성
export const TestContext=createContext({
  name:'',
  setNameHandler:(name:string)=>{}
})
// 2. 생성한 Context.Provider를통해서 value를 전달하여 사용할수있음
export const TestContextProvider=({children})=>{
  const [name,setName]=useState('')
  const setNameHandler=(name)=>setName(name)
  return (
    <TestContext.Provider value={{name,setNameHandler}}>
    {children}
    </TestContext.Provider>
  )
}
// 3. export하여 App.js에서 TestContextProvider를 넣어줌

// 4. useContext훅과 TestContextProvider를 사용 하려는 컴포넌트에서 불러와서 사용이가능하다
const Slider=()=>{
  const {name,setNameHandler}=useContext(TestContext)
}

~~~