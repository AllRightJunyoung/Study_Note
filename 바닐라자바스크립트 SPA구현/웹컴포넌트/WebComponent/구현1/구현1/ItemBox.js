import Component from "../../../core/Component/Component";


export default class ItemBox extends Component{

    // html 스켈레톤 

    template() {
        const { items } = this.props
        return `
          <button class="add-btn">추가</button>
          <ul>
          ${items.map((item) => `
          <li>
          ${item.content}
          <button class="del-btn" data-index="${item.seq}">삭제</button>
          </li>
          `).join('')}
          </ul>
        `
    }

    // 부모로부터 온 Event 설정 
    setEvnet() {
        const { addItem, deleteItem, items } = this.props
        this.addEvent('click', '.add-btn', ({ target }) => {
        addItem(`item ${items.length+1}`)
        })
    }
}