import { render, screen,fireEvent } from '@testing-library/react';
import App from './App';

// test('버튼 테스트', () => {
//   render(<App/>)
//   // button의 역할을 찾고  Change to blue인  버튼을 찾는다. 
//   const colorsButton=screen.getByRole('button',{name: 'Change to blue'})
//   expect(colorsButton).toHaveStyle({backgroundColor:'red'})

//   // 버튼을 눌렀을떄 색깔이 파란색이어야한다.
//   fireEvent.click(colorsButton)
//   expect(colorsButton).toHaveStyle({backgroundColor:'blue'})


//   // 버튼의 내용은 Change to red여야한다.
//   expect(colorsButton.textContent).toBe('Change to red')

// });

// test('initial conditions',()=>{
//   render(<App/>)  

//   // 버튼이 활성화됬는지
//   const colorButton=screen.getByRole('button',{name:'button'})
//   expect(colorButton).toBeEnabled()

//   // 체크 박스가 체크가 안된지
//   const checkbox=screen.getByRole('checkbox');
//   expect(checkbox).toBeChecked()


// })

// 체크 박스를 눌렀을떄  버튼은 비활성화 되어있다.
test('checkbox',()=>{
  render(<App/>)
  const checkbox=screen.getByRole('checkbox') 
  const button=screen.getByRole('button',{name:'button'})

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
 
})