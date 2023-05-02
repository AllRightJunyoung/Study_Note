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
