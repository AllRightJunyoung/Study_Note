## 일반적인 비동기 코드 (비효율적)

~~~ jsx

<button onClick={async()=>{
  const res=await fetch('http://api.countapi.xyz/visits')
  const data=await res.json()
  dispatch(set(data.value))
}}>

~~~

## Redux thunk를 사용한 코드 (효율적)

~~~jsx
//counterslice.js
// createAsyncThunk로 type과 ,function 정의

// 액션 생성
const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch',
  async () => {
    const resp = await fetch('https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits')
    const data = await resp.json();
    return data.value; // action.payload로 들어가짐

  }
)


const counterSlice = createSlice({
  name:'counterSlice',
  initialState:{
    value:0,
    status:'Welcome'
  },
  // 동기적인 액션 (action creater를 툴킷이 자동으로 만들어줌)
  reducers:{
    up:(state, action)=>{
      state.value = state.value + action.payload;
    }
  },
  // 비동기적인 액션 처리 (action create를 자동으로 못만들어줌)
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state,action)=>{
      state.status = 'Loading';
    })
    builder.addCase(asyncUpFetch.fulfilled, (state,action)=>{
      // 
      state.value = action.payload;
      state.status = 'complete';
    })
    builder.addCase(asyncUpFetch.rejected, (state,action)=>{
      state.status = 'fail';
    })
  }
});
export default counterSlice;
// 동기적
export const {up, set} = counterSlice.actions;
// 비동기적
export {asyncUp, asyncUpFetch}

// App.js

function Counter(){
  const dispatch = useDispatch();
  const count = useSelector(state=>{
    return state.counter.value;
  });
  const status = useSelector(state=>{
    return state.counter.status;
  });
  return 
    
    <button onClick={()=>{
      dispatch(asyncUpFetch());
    }}>+ async fetch</button><br/>
    
    <div>{count} | {status}</div>
  </div>
}
export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter></Counter>
      </div>
    </Provider>
  );
}




~~~
