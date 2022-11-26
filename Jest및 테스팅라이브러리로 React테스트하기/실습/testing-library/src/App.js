import {useState} from 'react'
import logo from './logo.svg';
import './App.css';

export const replaceCameWithSpaces=(colorName)=>{
  return colorName.replace(/\B([A-Z]\B/g,' $1')
}


function App() {
  const [checked,setchecked]=useState(false)
 
  //버튼이 비활성화 됬을떄 버튼의색을 회색으로 바꾸는것 활성화되면 다시 빨간색

  return (
    <div>
     <button disabled={checked} style={{width:'200px',height:'200px', backgroundColor:checked ? 'gray' : 'red'}}>button</button>
     <div>
    <input type="checkbox" onClick={(ev)=>setchecked(ev.target.checked)}/>
    </div>
    </div>
  )
}

export default App;
