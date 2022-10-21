## configureStore()

- 스토어를 구성하는 함수이다
- 추가로 redux DevTools Extenstion도 활성화 시켜준다.
- 매개변수로 reducer,middleware,devTools,preloadState,enhancer가 전달된다.

~~~ jsx


const store=configureStore({
  reducer:rootReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
  devTools:process.env.NODE_ENV!=='production',
  preloadedState,
  enhancers:[] ,or 콜백
})

~~~

## createReducer()

- 상태에 변화를 일으키는 리듀서 함수를 생성하는 유틸함수

> RTK에서는 builder callback 표기법과 map object표기법이 존재하는데 타입스크립트의 호환성에서는 builder callback 표기법을 선호한다.

### Builder Callback 표기법

- createReducer의 콜백함수 인자로주어지는 builder객체로 함수에서 액션을 리듀서에서 어떻게 처리할지 정의함
  - addCase ,addMatcher,addDefaultCase 메서드 제공

소스코드 예시

~~~ jsx
const counterReducer=createReducer(initalState,(builder)=>{
  builder.addCase(increment,(state)=>{})
  builder.addCase(decrement,(state)=>{})
}) // 체이닝도 가능하다

~~~

## createAction()

- 액션을  만드는데 사용한다
- 콜백함수로 전달하여 액션의 payload를 수정할수있음

## createSlice()

- createAction과 createRedcuer메소드를 작성할 필요가 없어짐
- feature 폴더안에 상태 도메인 별로 나누어 쓰는것을 추천함 (공식문서에 의해)
- extraReducers createSlice가 생성한 액션타입외에 다른 액션타입을 응답하는데 사용 , 외부의 액션을 참조
  - 서버로부터 데이터 가져오는 로직이나 , 비동기로직을 사용
  
소스코드 예시

~~~jsx
const todosSlice=createSlice({
  name:'todos',
  initalState:{
    todos:[]
  }
  reducers:{
    addTodo:{
      reducer:(state,action)=>{
        state.push(action.payload)
      },
      prepare:(text)=>{
        const id=id()
        return {payload:{id,text}}
        // reducer를 실행하기전에 payload의 값을 변경함 (prepare명시)
      }
    }
  }
  extraReducers:(builder)=>{
    builder.addCase(함수명.fuilfiled,(state,action)=>{
      state.todos.push(action.payload)
    })
  }
})


~~~
