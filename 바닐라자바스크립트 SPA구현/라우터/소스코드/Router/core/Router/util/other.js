// ROute를 가져옴 data링크기반으로 
export const importRoute = (e) => {
    return e.target.dataset.route
}
export const isRouteEvent = (e) => {
    return e.target.dataset.route ? true:false     
}
export const getBroswerRoute = () => {
    return location.pathname
}