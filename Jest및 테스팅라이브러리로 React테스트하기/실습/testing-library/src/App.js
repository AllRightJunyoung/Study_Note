import {useState} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [checked,setchecked]=useState(false)
 
  
  // 체크 박스가 체크되기 전에는 버튼이 활성화 되있고 체크박스가 체크된 후에는 버튼이 활성화 x

  // 체크가 된후 버튼이 비활성화되는점만 확인


  return (
    <div>
     <button disabled={checked} style={{width:'200px',height:'200px'}}>button</button>
     <div>
    <input type="checkbox" onClick={(ev)=>ev.target.checked ? setchecked(true) : setchecked(false)}/>
    </div>
    </div>
  )
}

export default App;
