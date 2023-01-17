# 정적(Static) pre-rendring의 단점 (중요)
> getStaticProps , getStaticPaths 사용
1. 들어오는 실제 요청에는 접근할수없음 (정해진 id의 기반으로 데이터를 내려줌)
   - 이러한 이유로 모든 URL에 대응되는것을 사전에 정의를 내려줄수밖에없음 (모든 요청을 다 처리하지 못함)


# 서버사이드 렌더링이 필요한 이유
- 유입되는 모든 요청에 대한 페이지를 사전 렌더링할수있음
  - 서버에 도달하는 특정 요청 객체에 접근이 가능 

- 빌드 타임 시간이나 매초마다 사전생성을 하지 않고 서버에서만 작동할수있음

## 서버사이드 렌더링 메소드 
- getServerSideProps 
  - getStaticProps와 같이 사용하는것은 불가능
  - 비동기함수다
  - export해서 사용가능
  - 배포된 서버와 개발서버에서만 실행된다
  - 서버에서만 동작하므로 getStaticPaths와 같은 함수를 사용안해도 잘동작 (서버사이드에서 처리하기떄문)


## Next.js에서 pre-rendering이 필요하지 않은경우
1. 데이터가 자주 바뀐다 (주식 데이터)
2. 특정유저에게 한정된 데이터
3. 다양한데이터가 한번에 오는경우
> 클라이언트 사이드에서 데이터페칭을 하는것이 좋다 (React 측에서)

## 클라이언트 사이드에서 데이터페칭 하는 방법
1.useEffect 사용
- 복잡해져서 비추함

~~~ tsx
useEffect(() => {
    setIsLoading(true);
    fetch("https://hisdf-3d150-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformSales = [];
        for (const key in data) {
          transformSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformSales);
        setIsLoading(false);
      });
  }, []);
~~~

2. SWR 사용 (추천)
- 데이터 캐싱과 , 최신 데이터를 제공하기위한 데이터 유효성 재검사를 제공
- 코드로직이 간편해짐 (매우큰 장점)
- 단점 : 클라이언트 사이드에서 서버로부터 요청해서 데이터를 가져오는것이므로 pre-rendering 문제가발생
  - SWR과 getStaticProps를 같이써서 preRendering과 실시간 데이터반영을 할수있음

~~~ ts
  const { data, error } = useSWR(
    "https://hisdf-3d150-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformSales = [];
      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformSales);
    }
  }, [data]);
~~~
