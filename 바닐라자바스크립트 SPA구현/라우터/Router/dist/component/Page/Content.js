import Component from '../../../core/Component/Component'
import AboutButton from '../RouteButton/AboutButton'
import HomeButton from '../RouteButton/HomeButton'
import ContentButton from '../RouteButton/ContentButton'


// 추상화된 Component 상속
export default class Content extends Component{
    // 오버라이드 
    template() {
        return `
       
        <nav id="main-nav" class="sidebar">
             ${new HomeButton().template()}
             ${new AboutButton().template()}
             ${new ContentButton().template()}
            <br><br>
           
        </nav>
        <div>
        <h1>Content 페이지</h1>
        </div>
        `
    }

}
