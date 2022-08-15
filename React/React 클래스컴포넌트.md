## 리액스 클래스 컴포넌트 
- 현재는 잘 사용하지만 레거시 개선을 위해서 필요하긴함
- render() 함수를 써서 jsx를 반환시킴 
- 라이프 사이클 메소드 사용가능 
- consturctor->render-> ref->componentDidMount 순으로 실행됨
- setState/props가 바뀔떄 -> shouldComponentUpdate-> render -> componentDidUpdate
- 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸 

~~~ jsx 
import React, { Component } from 'react';

class Hello extends Component {
  render() {
    const { color, name, isSpecial } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

Hello.defaultProps = {
  name: '이름없음'
};

export default Hello;
~~~


# 클래스형 컴포넌트 생명주기 (LifeCycle)

## 마운트 단계(Mounting)
- 컴포넌트 객체가 최초로 생성되어 DOM에 삽입될 때 한번 실행됨

## 업데이트 단계 (Updating)
- props,state가 변경될때마다 수행되며 변경사항을 화면에 표시

## 소멸단계 (Unmounting)
- 컴포넌트가 DOM상에서 제거될떄 한번 호출됨


# 리액트 라이프 사이클 메소드

## ComponentDidMount()
- 처음으로 Render()가 성공적으로 실행된뒤에 실행되는 함수 
  - 컴포넌트가 첫 렌더링 된후만 실행 
- state가 변경되서 리렌더링 될떄에는 실행이 되지 않음 (무조건 처음에만)

## ComponentWillMount()
- 컴포넌트가 제거되기 직전에 실행

## ComponentDidUpdate
- 리렌더링후에 실행됨 
  - state시 변경시 






 # 참고
 - https://points.tistory.com/88
 - https://www.youtube.com/watch?v=ltw4FYagLfM&list=RDCMUCp-vBtwvBmDiGqjvLjChaJw&start_radio=1&rv=ltw4FYagLfM&t=82