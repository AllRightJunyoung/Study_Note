/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HistoryRouter)
/* harmony export */ });
/* harmony import */ var _util_History__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _util_EventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _dist_component_ErrorPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
// 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 보여주는 준다





class HistoryRouter{
    constructor() {
        (0,_util_EventHandler__WEBPACK_IMPORTED_MODULE_1__.eventHandlerInit)()
        this.root=null
        this.routes = new Map()
        window.addEventListener('historychange', (e) => this.onHistoryChangeHandler(e))
        window.addEventListener('popstate', (e) => this.onHistoryChangeHandler(e))
      }

    setRootElement(_root) {
        this.root = document.querySelector(`${_root}`)
        this.onHistoryChangeHandler("refresh")
      }

    // 컴포넌트를 렌더링하는 함수
    renderComponent(content) {
        this.root.innerHTML=content
    }
    
    // 해당 route에 맞는객체를 가져옴 
    getRoute(route) {
        return this.routes.get(route)
    }

    // 해당 route의 존재유무를 확인 
    hasRoute(route) {
        return this.routes.has(route)
    }

    // 라우트 추가 기능 
    addRoute(_route, element) {
        this.routes.set(_route,element)
    }
    
 
    onHistoryChangeHandler = (e) => {
        const path = e.detail ? e.detail : location.pathname
        console.log(path)
        const component = this.getRoute(this.convertPath(path))
        if (component) {
            (0,_util_History__WEBPACK_IMPORTED_MODULE_0__.changePath)(path)
            this.renderComponent(component.template())
        }
        else {
            this.renderComponent(new _dist_component_ErrorPage__WEBPACK_IMPORTED_MODULE_2__["default"]().template())
        }
    }
    
    // 정적라우팅인지 동적라우팅인지 판별하고 그에 맞게가져옴
    convertPath(url){
        if (this.hasRoute(url)) {// 정적라우팅 이면
            return url
        }  
        else {
           return (0,_util_History__WEBPACK_IMPORTED_MODULE_0__.convertDynamicPath)(url) // 동적라우팅 이면
        }    
    }
}



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changePath": () => (/* binding */ changePath),
/* harmony export */   "convertDynamicPath": () => (/* binding */ convertDynamicPath)
/* harmony export */ });
const convertDynamicPath =(path)=> {
    const regex = /\w{1,}$/;
    return `${path.replace(regex,":id")}`
}

const changePath= (path) => {
    // 기존의 히스토리인경우 스택에 쌓지않음    
    if (path === location.pathname) {
            history.replaceState(null,"",path)
        }
        // 기존의 히스토리가 아닐경우 pushState
        else {
            history.pushState(null, '', path)
        }  
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventHandlerInit": () => (/* binding */ eventHandlerInit)
/* harmony export */ });
const eventHandlerInit = () => {
    document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click',AnchorEventHandler)     
    })
}

// A태그 default parameter
const AnchorEventHandler = (e) => {
    e.preventDefault();
    const target = e.target.closest("a");
    if (!target instanceof HTMLAnchorElement || target===null) return;
    const url = e.target.href.replace(location.origin,"")
    HistoryChangeEvent(url)
}


// 커스텀 이벤트 설정 
const HistoryChangeEvent = (path) => {
    const HistoryEventHanlder = new CustomEvent('historychange', {detail:path})
    dispatchEvent(HistoryEventHanlder)
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorPage)
/* harmony export */ });
/* harmony import */ var _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);



class ErrorPage extends _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
    // 오버라이드 
    template() {
        return `
             <div>
             404 Not Found
             </div>
        `
    }

}



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
// 추상화 

class Component{
    constructor(_view) {
        this.view=_view
    }
    render() {
        this.view.innerHTML=this.template()
    }
    template() {
        return ''
    }
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ About)
/* harmony export */ });
/* harmony import */ var _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);




// 추상화된 Component 상속
class About extends _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
    // 오버라이드 
    template() {
        return `    
        <nav id="main-nav" class="sidebar">
            <a href="/home">Home</a>
            <a href="/home/1">Home2</a>
            <a href="/about">About</a>
            <a href="/content">Content</a>
        </nav>
        <div>
        <h1>aBout 페이지</h1>
        </div>
        `
    }

}



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Content)
/* harmony export */ });
/* harmony import */ var _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


// 추상화된 Component 상속
class Content extends _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
    // 오버라이드 
    template() {
        return `
       
        <nav id="main-nav" class="sidebar">
            <a href="/home">Home</a>
            <a href="/home/1">Home2</a>
            <a href="/about">About</a>
            <a href="/content">Content</a>
        </nav>
        <div>
        <h1>Content 페이지</h1>
        </div>
        `
    }

}


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);



// 추상화된 Component 상속
class Home extends _core_Component_Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
    // 오버라이드 
    
    template() {
        return `
        <nav id="main-nav" class="sidebar">
            <a href="/home">Home</a>
            <a href="/home/1">Home2</a>
            <a href="/about">About</a>
            <a href="/content">Content</a>
        </nav>
        <h1> Home 페이지 </h1>
        </div>
        `
    }
    

}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Router_HistoryRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _component_About_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _component_Content_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _component_Home_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);





var init = function init() {
  var router = new _core_Router_HistoryRouter__WEBPACK_IMPORTED_MODULE_0__["default"]();
  router.addRoute('/about', new _component_About_js__WEBPACK_IMPORTED_MODULE_1__["default"]());
  router.addRoute('/content', new _component_Content_js__WEBPACK_IMPORTED_MODULE_2__["default"]());
  router.addRoute('/', new _component_Home_js__WEBPACK_IMPORTED_MODULE_3__["default"]());
  router.addRoute('/home', new _component_Home_js__WEBPACK_IMPORTED_MODULE_3__["default"]());
  router.addRoute('/home/:id', new _component_Home_js__WEBPACK_IMPORTED_MODULE_3__["default"]());
  router.setRootElement('#root');
};

init();
})();

/******/ })()
;