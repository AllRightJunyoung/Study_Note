# Chapter4 타입설계

## Item 28 : 유효한 상태만 표현하는 타입을 지향하기
> 타입을 잘설계하면 코드는 직관적으로 작성이 가능하다
- 효과적인 타입설계는 유효한 상태만 표현할수있는 타입을 만드는게 중요하다
- 유효한 상태와 무효한 상태를 둘다 표현하는 타입은 매우안좋다 
  - 유효한 상태만 표현하는 타입을 지향해야한다. (코드가 길어지거나 표현하기 어렵지만 문제발생을 안한다)
~~~ts
interface State{
    pageText:string;
    isLoading:boolean;
    error?:string;
}

// 로딩과 동시에 error값이 존재하면 로딩중인지 오류가발생한상태인지 알수없음 (필요한 정보가 부족하다)
function renderPage(state:State){
    if(state.error){

    }
    else if(state.isLoading){

    }
    return 
}

// 개선한 타입
interface RequestPending{
    state:'pending';
}
interface RequestError{
    state:'error';
    error:string;
}
interface RequestSuccess{
    state:'ok';
    pageText:string;
}

type RequestState=RequestPending | RequestError | RequestSuccess
// 태그된 유니온으로 네트워크의 요청 과정 각각의 상태를 명시적으로 모델링 (유니온 타입사용)
interface State{
    currentPage:string;
    requests:{[page:string]:RequestState}
}

~~~