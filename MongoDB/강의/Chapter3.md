# Non-blocking

- 비동기 프로그래밍 이라고함 (이벤트루프 작동원리)
  - 웨이터 한명이 테이블 여러개의 주문을 받음 (주기적으로 확인)
- blocking 방식은 기존수행이 다 진행되야 다음으로 넘어갈수있음
  - 웨이터 한명이 테이블 한개주문후 요리가나올떄까지 대기

## 동기적 실행과 비동기적 실행

```js
// 비동기적
function createBlog(){
    User.findOne({...})
    Blog.insertOne({...})
    LogApi({...})
}
// 동기적
async function createBlog(){
    await User.findOne({...})
    await Blog.insertOne({...})
    await LogApi({...})
}

// 처리 작업을 동시에 해도되는경우

async function createBlog(){
    await User.findOne({...})
    await Promise.all(([
        Blog.insertOne({...})
        User.updateOne({...})
    ]))
    await LogApi({...})
}

```
