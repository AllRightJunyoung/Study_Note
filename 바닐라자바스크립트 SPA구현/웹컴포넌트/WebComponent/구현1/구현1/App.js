import Component from "../../core/Component/Component"
import ItemBox from "./Item/ItemBox"

//  참고 황준일 개발자 블로그

// 최상위 부모 컴포넌트 
export default class App extends Component{

    // default state 값 설정  
    setup() {
    this.state={items: [
        {
          seq: 1,
          content: 'item1',
        },
        {
          seq: 2,
          content: 'item2'
        }
      ]}    
    }  

    template() {
        return `
        <div>
        <h1>Main 페이지</h1>
        <div data-component="item-box">
        </div>
        </div>
        `
    }

    // 렌더링 직후 실행될 함수  (이때 자식 컴포넌트를 마운트 해준다.)
    mounted() {
        const { addItem } = this
        const _itemBox = this.target.querySelector(`[data-component="item-box"]`)
       
        // 자식 컴포넌트의 html과 , props를 넘겨줌
        new ItemBox(_itemBox, {
            addItem: addItem.bind(this),
            items:[...this.state.items] 
        })

    }

    // 아이템 추가
    addItem(item) {
        const { items } = this.state
        const seq = Math.max(0, ...items.map(v => v.seq)) + 1
        
        this.setState({
            items: [
                ...items,
                {content:item,seq}
            ]
        })
    }
}



