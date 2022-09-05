import {match} from 'path-to-regexp'

// 라이브러리를 사용해서 동작 라우팅을 매칭시킴 
///home/4로들어온거를 => /home/:id와 매핑되는지확인 

export const findRoute = (path, routes) => {
    let result = ""
    // 모든라우터를 순회하면서 현재 url과 동일한 객체를 찾음 
    routes.forEach((value,key) => {
       const routeMatch = match(`${key}`, { decode: decodeURIComponent })
        if (routeMatch(path)) {
            result = value
         }
    });
    console.log(result)
    return result
}
