import InfiniteScroll from "react-infinite-scroller";

import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetching } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastpage) => lastpage.next || undefined,
    }
  );

  // fetchNextPage => 더 많은 데이터가 필요할떄 어느함수를 실행시킬지 InfiniteScroll에 지시한다.
  // hasNextPage => booelan 반환 getNextPageParam 함수의 반환값을 기반으로 동작함

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error : {error.toString()}</div>;

  return (
    <>
      {/*  Fetching을 여기서 하지않으면 스크롤이 위로 올라가버림 .. 새로운 페이지가 열릴떄마다 조기반환되서 그럼 */}
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              ></Person>
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
