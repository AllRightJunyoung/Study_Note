# Next js 앱 최적화 파트

1. 메타 태그및 head 태그 추가
2. 이미지 최적화

# 메타데이터의 필요성
- 사용자 경험을 올릴수있음 (페이지에대한 설명과 제목)

## Next.js에서 Head태그 사용하기
- next/head를 import해서 컴포넌트상에서 사용할수있음
  - HTML내부 메타태그와 동일하게 사용

- __app.js 파일은 페이지의 루트이므로 여기에 Head태그를 정의해서 공통된것을 넣을수있다. (__app.js는 body섹션 속 루트 컴포넌트)
  - 만약에 다른 페이지에서 Head태그를 정의했을떄 공통적인 부분이있어도 Next.js에서는 전부 병합해줌

~~~ js
import Head  from 'next/head';
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta 
        name='description'
        content="Find ad lot of great events that allow you to envolve"
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}
~~~

## _documents.js 파일의역할
> 전체 HTML문서를 커스터마이징 할수있다.
- next/document로 import해서 사용
- 모달 만들떄도 유용
~~~ js
import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
~~~

## Next 이미지
- 이미지 용량 크기를 최적화시켜줄수있다 
- import Image from 'next-image' 사용
- WebP이미지로 변경
- 이미지가 필요할때마다 최적화되어 생성, 필요할떄 이미지를 가져와서사용 
- 이미지가 안보일떄 request시 lazy로딩을 하여 보일떄 가져옴
- 기존의 css가 적용되면 기존의css를 반영한다.

