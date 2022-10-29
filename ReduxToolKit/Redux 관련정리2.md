# Redux 원칙

1. 하나의 스토어만을 권장한다.

- combineReducers를 사용하여 여러개의 리듀서를 하나로 합쳐 store에 넘긴다

2. 상태를 순수함수를 통해 변화시킨다 (순수함수는 외부에 영향을 안미침 => 불변유지)

# Redux 기본개념

1. 액션 : 어플리케이션 상태를 어떻게 변경시킬지 추상화시킨 표현 (Plain Object만을 받음)
2. 리듀서 : 이전 상태를 새로운 상태로 만들어서 반환을 시킨다.
3. 스토어 : 애플리케이션의 상태를 저장하고 읽을수 있으며 , 액션을 보내거나 상태변경을 감지할수있는 객체

# Redux 실행 Flow

1. Dispatch (action)
2. Reducer(currentState,action)
3. Reducer에서 currentState<=nextState
4. listeners 호출

# Redux create Store 소스코드 살펴보기

~~~ js
// creatStore.js 부분
 function dispatch(action: A) {
    //  plainObject (만을 받는다) 액션
    // 하지만 미들웨어를 사용하면 함수 실행이 가능함 미들웨어는 dispatch보다 먼저실행이되며 미들웨어를 실행한결과값은 plainObject가 됨  
    if (!isPlainObject(action)) {
      throw new Error(
        `Actions must be plain objects. Instead, the actual type was: '${kindOf(
          action
        )}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`
      )
    }

    //  예외처리 부분
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
      )
    }

    //  dispatch시에는 어떠한 것도 접근할수없음 
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // dispatch중에 currentReducer메소드를 통해 action에맞는 새로운 상태를 반환 (순수함수)
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    // 상태값이 변경된뒤 dispatch는 false가 되고 등록되어있는 listener들에게 알린다. (렌더링이 트리거 되야할때 알림 )
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }
~~~

> 리덕스는 동기적으로 처리가된다

> 비동기적인 작업은 미들웨어에서 처리를 하게된다.

# Redux applyMiddleware 소스코드

~~~js
export default function applyMiddleware(): StoreEnhancer
export default function applyMiddleware<Ext1, S>(
  middleware1: Middleware<Ext1, S, any>
): StoreEnhancer<{ dispatch: Ext1 }>
export default function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>,
  middleware5: Middleware<Ext5, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>
export default function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{ dispatch: Ext }>

//  위에 까지는 여러개의 미들웨어를 받을수있다는 소스코드

// applyMiddleware === enhancer
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  // createStore를 받고있다 . 이말은 즉 applyMiddleware에서 createStore를 호출한다 
  // applyMiddleware에서 createStore를 호출 하기위해 createStore에서는 enhancer를 반환하는것을 볼수있음

  return (createStore: StoreEnhancerStoreCreator) =>
    <S, A extends AnyAction>(
      reducer: Reducer<S, A>,
      preloadedState?: PreloadedState<S>
    ) => {
        // 1. createStore를 실행함
      const store = createStore(reducer, preloadedState)
      let dispatch: Dispatch = () => {
        throw new Error(
          'Dispatching while constructing your middleware is not allowed. ' +
            'Other middleware would not be applied to this dispatch.'
        )
      }

      
      // getState store 상태접근 , dispatch
      const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      }
      // 모든 미들웨어 들을 순회하면서 middlewareAPI호출 
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      // compose를 통해 여러 미들웨어를 하나의 중첩된 함수로 묶음
      dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

      // 이 dispatch를 호출하면 중첩된 미들웨어가 실행된뒤에 reducer로 값 전달

      return {
        ...store,
        dispatch
      }
    }
}
~~~

# 요약

1. 리덕스는 하나의 스토어에 여러 리듀서를 합쳐서 사용된다.
2. 리덕스는 상태를 순수함수를 통해 변화시킨다 (순수함수는 외부에 영향을 안끼치는함수 )
3. 리덕스는 1.action Dispatch 2. Reducer(current,action) 3. Reducer에서 nextState=>currentState로저장 4. listeners 호출로 등록되어있는 listner에게 알린다 (렌더링이 트리거되기전에)
4. 리덕스는 동기적인 흐름으로 실행이된다. 비동기적인 처리는 미들웨어가있어서 가능하다
5. 미들웨어는 Reducer에 도달하기전 store.dispatch 실행전의 상태를 가지고 비동기 처리를 진행할수있음
- 즉 미들웨어들의 실행후에 dispatch를 하여 reducer에 전달한다 
  
# 참고

- <https://ui.toast.com/weekly-pick/ko_20170331>
- <https://github.com/reduxjs/redux/blob/master/src/>
