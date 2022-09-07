import HistoryRouter from '../core/Router/HistoryRouter' 
import About from './component/Page/About'
import Content from './component/Page/Content.js'
import Home from './component/Page/Home.js'

    
const init = () => {

    const router = new HistoryRouter()
    const home = new Home()
    const about=new About()
    const content = new Content()
    
    //  url , 사용자한테 보여지는 컴포넌트
    
    
    router.addRoute('/home', home)
    router.addRoute('/about', about)
    router.addRoute('/',home)
    router.addRoute('/home/:number',home)
    router.addRoute('/home/:id', home)
    router.addRoute('/home/:id/intro', home)
    router.addRoute('/home/:id/intro/:id', home)
    router.addRoute('/content', content)
    router.rootElementSettings('#root')
    

}
init()

